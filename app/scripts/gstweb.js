'use strict';

var tokenEl = document.getElementById('GST_AUTH_TOKEN');

if (tokenEl) {
	chrome.storage.sync.set({'GST_AUTH_TOKEN': tokenEl.value}, function() {
		console.log('auth saved');
	});
}
