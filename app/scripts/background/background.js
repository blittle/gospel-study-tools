import { THREE_MINUTES, HOST } from '../constants.js';
import Session from './Session.js';

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

	sessions[CURRENT_SESSION] = session;
	saveAndClearSession();
}

chrome.runtime.onMessage.addListener(
	(request, sender, sendResponse) => {
		if (request.GST_AUTH_TOKEN) {
			chrome.storage.sync.set({
				'GST_AUTH_TOKEN': request.GST_AUTH_TOKEN
			}, checkAuthentication);
		} else {

			let session = sessions[CURRENT_SESSION];

			if (!session) {
				session = new Session();
				sessions[CURRENT_SESSION] = session;
			}

			session.addResource(request);
			let json = session.getJSON();
			localStorage.setItem(STORAGE_SESSION_KEY, json);

			chrome.browserAction.setBadgeText({
				text: request.type.toLowerCase()
			});

			startSessionTimeout();
		}
	});

chrome.browserAction.onClicked.addListener((tab) => {
	if (!isAuthenticated) {
		chrome.tabs.create({
			url: HOST + '/authenticate/google'
		});
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
	localStorage.removeItem('GST:SESSON');
}

function checkAuthentication() {
	function clearAuthentication() {
		isAuthenticated = false;
		chrome.browserAction.setIcon({
			path: "images/icon-bw-19.png"
		})
	}

	chrome.storage.sync.get('GST_AUTH_TOKEN', function(result) {
		fetch(HOST + '/authenticated-user', {
				method: 'get',
				headers: {
					'Authorization': result.GST_AUTH_TOKEN,
					'Content-Type': 'application/json'
				}
			})
			.catch(clearAuthentication)
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
				if (json.error) {
					clearAuthentication();
				} else {
					isAuthenticated = true;
					chrome.browserAction.setIcon({
						path: "images/icon-19.png"
					})
				}
			})
	});
}