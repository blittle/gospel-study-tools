import { HOST } from './constants';

function getAuthorization() {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get('GST_AUTH_TOKEN', (result) => {
			if (result.GST_AUTH_TOKEN) resolve(result.GST_AUTH_TOKEN);
			else reject("Unauthorized");
		});
	});
}

function checkResponse(response) {
	if (response.status === 401) {
		showAuthErrorLogin()
		throw new Error('Not authorized');
	}
	return response.json();
}

export function getDayAggregation(count) {
	return new Promise((resolve, reject) => {
		getAuthorization().then((token) => {
			fetch(HOST + `/api/study-content/day-aggregation/${count}`, {
				method: 'get',
				headers: {
					'Authorization': token,
					'Content-Type': 'application/json'
				}
			})
			.catch(reject)
			.then(checkResponse)
			.catch(reject)
			.then(resolve);
		}).catch(showAuthErrorLogin)
	});
}

export function getContent() {
	return new Promise((resolve, reject) => {
		getAuthorization().then((token)  => {
			fetch(HOST + `/api/study-content`, {
				method: 'get',
				headers: {
					'Authorization': token,
					'Content-Type': 'application/json'
				}
			})
			.catch(reject)
			.then(checkResponse)
			.catch(reject)
			.then(resolve);
		}).catch(showAuthErrorLogin)
	});
}

export function getAuthenticatedUser() {
	return new Promise((resolve, reject) => {
		getAuthorization().then((token) => {
			fetch(HOST + `/api/authenticated-user`, {
				method: 'get',
				headers: {
					'Authorization': token,
					'Content-Type': 'application/json'
				}
			})
			.catch(reject)
			.then(checkResponse)
			.catch(reject)
			.then(resolve);
		}).catch(showAuthErrorLogin)
	})
}

export function logoutUser() {
	return new Promise((resolve, reject) => {
		getAuthorization().then((token) => {
			fetch(HOST + `/api/authenticated-user/logout`, {
				method: 'post',
				headers: {
					'Authorization': token,
					'Content-Type': 'application/json'
				}
			})
			.catch(reject)
			.then(checkResponse)
			.catch(reject)
			.then(resolve);
		}).catch(showAuthErrorLogin)
	})
}

export function deleteUser() {
	return new Promise((resolve, reject) => {
		getAuthorization().then((token) => {
			fetch(HOST + `/api/authenticated-user`, {
				method: 'delete',
				headers: {
					'Authorization': token,
					'Content-Type': 'application/json'
				}
			})
			.catch(reject)
			.then(checkResponse)
			.catch(reject)
			.then(resolve);
		}).catch(showAuthErrorLogin)
	})
}

export function showAuthErrorLogin() {
	document.querySelector('.auth').className = 'auth show';
	document.querySelector('.main-app').className = 'main-app hidden';
}

export function getBadges() {
	return new Promise((resolve, reject) => {
		getAuthorization().then((token) => {
			fetch(HOST + `/api/study-content/badges`, {
				method: 'get',
				headers: {
					'Authorization': token,
					'Content-Type': 'application/json'
				}
			})
			.catch(reject)
			.then(checkResponse)
			.catch(reject)
			.then(resolve);
		}).catch(showAuthErrorLogin)
	})
}
