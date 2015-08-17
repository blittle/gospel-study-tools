import '../bower_components/fetch/fetch.js';
import { HOST } from './constants';
import * as resource from './background/resource';

console.log('\'Allo \'Allo! Popup');

function handleError() {
}

chrome.storage.sync.get('GST_AUTH_TOKEN', function(result) {
	resource.getAuthenticatedUser(result.GST_AUTH_TOKEN)
	.catch(() => handleError)
	.then(response => response.json())
	.then((json) => {
		if (json.error) {
			return handleError();
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
