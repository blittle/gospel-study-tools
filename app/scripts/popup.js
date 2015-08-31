import '../bower_components/fetch/fetch.js';
import { HOST } from './constants';
import { parseDate } from './utils';
import * as resource from './background/resource';
import { redirectToLogin } from './data';

document.getElementById('login').addEventListener('click', () => {
	redirectToLogin();
});

document.getElementById('view-stats').addEventListener('click', () => {
	chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
});

function handleError(error) {
	document.querySelector('.gst-popup').style.display = 'none';
	document.querySelector('.gst-popup-auth').style.display = 'block';
}

chrome.storage.sync.get('GST_AUTH_TOKEN', function(result) {
	resource.getAuthenticatedUser(result.GST_AUTH_TOKEN)
	.catch(() => handleError)
	.then((response) => {
		if (response.json) return response.json();
		else return new Promise((resolve, reject) => {
			handleError();
		});
	})
	.then((json) => {
		if (json.error) {
			return handleError(json.error);
		}

		fetch(HOST + '/study-content/day-aggregation/1', {
			method: 'get',
			headers: {
				'Authorization': result.GST_AUTH_TOKEN,
				'Content-Type': 'application/json'
			}
		})
		.catch(() => handleError)
		.then(response => response.json())
		.then((json) => {

			document.querySelector('.gst-popup').style.display = 'block';
			document.querySelector('.gst-popup-auth').style.display = 'none';

			const {hours, minutes, seconds} = getHoursMinutesSeconds(json.data[0].total_seconds);
			document.getElementById('hours').innerText = hours;
			document.getElementById('minutes').innerText = minutes;
			document.getElementById('seconds').innerText = seconds;
		});
	})
});

function getHoursMinutesSeconds(seconds) {
	var sec_num = parseInt(seconds, 10); // don't forget the second param
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	return {
		hours, minutes, seconds
	}
}
