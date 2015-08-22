import { HOST } from './constants';

function getAuthorization() {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get('GST_AUTH_TOKEN', (result) => {
			if (result.GST_AUTH_TOKEN) resolve(result.GST_AUTH_TOKEN);
			else reject("Unauthorized");
		});
	});
}

export function getDayAggregation(count) {
	return new Promise((resolve, reject) => {
		getAuthorization().then((token) => {
			fetch(HOST + `/study-content/day-aggregation/${count}`, {
				method: 'get',
				headers: {
					'Authorization': token,
					'Content-Type': 'application/json'
				}
			})
			.catch(reject)
			.then(response => response.json())
			.catch(reject)
			.then(resolve);
		})
	});
}

export function getTopContent() {
	return new Promise((resolve, reject) => {
		getAuthorization().then((token)  => {
			fetch(HOST + `/study-content/top`, {
				method: 'get',
				headers: {
					'Authorization': token,
					'Content-Type': 'application/json'
				}
			})
			.catch(reject)
			.then(response => response.json())
			.catch(reject)
			.then(resolve);
		})
	});
}
