import { THREE_MINUTES, HOST } from '../constants.js';
import Session from './Session.js';
import * as resource from './resource.js';

const CURRENT_SESSION = 'CURRENT_SESSION';
const STORAGE_SESSION_KEY = 'GST:SESSION';

let isAuthenticated = false;
let sessions = {};
let sessionTimeout;

checkAuthentication();

let storageSession = localStorage.getItem(STORAGE_SESSION_KEY);

if (storageSession) {
	let session = new Session(
		JSON.parse(storageSession)
	);

	sessions[CURRENT_SESSION] = window.gstSession = session;
	saveAndClearSession();
}

chrome.runtime.onMessage.addListener(
	(request, sender, sendResponse) => {
		if (request.RENDER_POPUP) {
			checkAuthentication();
			let session = sessions[CURRENT_SESSION];

			if (session) {
				// The session in memory has not been sent to the server,
				// send it to the popup window so it can accurately render
				// the daily study amount
				chrome.runtime.sendMessage({
					INMEMORY_STUDY_TIME: true,
					time: ( new Date().getTime() ) - session.getStartTime()
				});
			} else {
				chrome.runtime.sendMessage({
					INMEMORY_STUDY_TIME: true,
					time: 0
				});
			}

			updateIcon();

		} else if (request.GST_AUTH_TOKEN) {
			chrome.storage.sync.set({
				'GST_AUTH_TOKEN': request.GST_AUTH_TOKEN
			}, () => {
				checkAuthentication();
				chrome.tabs.create({ url: "index.html" });
			});

		} else if(!request.INMEMORY_STUDY_TIME) {

			checkAuthentication();

			let session = sessions[CURRENT_SESSION];

			if (!session) {
				session = new Session();
				sessions[CURRENT_SESSION] = session;
			}

			session.addResource(request);
			let json = session.getJSON();
			localStorage.setItem(STORAGE_SESSION_KEY, json);

			// chrome.browserAction.setBadgeText({
			// 	text: request.type.toLowerCase()
			// });

			startSessionTimeout();
			updateIcon();
		}
	});


function startSessionTimeout() {
	if (sessionTimeout) clearTimeout(sessionTimeout);
	sessionTimeout = setTimeout(() => {
		saveAndClearSession();
	}, THREE_MINUTES);
}

function saveAndClearSession() {
	let pSession = sessions[CURRENT_SESSION].getProcessedSession();
	console.log(pSession);

	delete sessions[CURRENT_SESSION];
	localStorage.removeItem(STORAGE_SESSION_KEY);

	resource.saveSession(pSession);

	chrome.browserAction.setBadgeText({
		text: ''
	});

	updateIcon();
}

function checkAuthentication() {
	function clearAuthentication() {
		isAuthenticated = false;
		updateIcon();
	}

	chrome.storage.sync.get('GST_AUTH_TOKEN', function(result) {
		resource.getAuthenticatedUser(result.GST_AUTH_TOKEN)
			.catch(clearAuthentication)
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {

				resource.setAuthToken(result.GST_AUTH_TOKEN);

				if (json.error) {
					clearAuthentication();
				} else {
					isAuthenticated = true;
				}

				updateIcon();
			})
	});
}

function updateIcon() {
	if (!isAuthenticated) {
		chrome.browserAction.setIcon({
			path: "images/icon-bw-19.png"
		})
	} else {
		if (sessions[CURRENT_SESSION]) {
			chrome.browserAction.setIcon({
				path: "images/icon-19.png"
			})
		} else {
			chrome.browserAction.setIcon({
				path: "images/icon-blank-19.png"
			})
		}
	}
}
