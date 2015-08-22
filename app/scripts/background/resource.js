import { HOST, ONE_MINUTE } from '../constants.js';
import generateStudySessions from './generate';

let token;

let studySessionSaveQueue = [];

function saveSessionQueue() {
	let error;

	while (studySessionSaveQueue.length && !error) {
		let studySession = studySessionSaveQueue.shift();

		trySave(studySession).catch((error) => {
			error = error;
		});

		if (error) studySessionSaveQueue.push(studySession);
	}

	if (error) {
		console.error('Error saving session. Trying again in 10 minutes.', error)
		setTimeout(saveSessionQueue, ONE_MINUTE * 10);
	}
}

function trySave(studySession) {
	return fetch(HOST + '/study-sessions', {
		method: 'post',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(studySession)
	});
}

export function setAuthToken(_token) {
	token = _token;
}

export function saveSession(studySession) {
	studySessionSaveQueue.push(studySession);
	setTimeout(saveSessionQueue);
}

export function getAuthenticatedUser(token) {
	return fetch(HOST + '/authenticated-user', {
		method: 'get',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		}
	})
}

window.generateStudyContent = function(count) {
	generateStudySessions(count).forEach((content) => {
		trySave(content);
	})
}
