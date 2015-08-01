'use strict';

var tokenEl = document.getElementById('GST_AUTH_TOKEN');

if (tokenEl) {
	chrome.runtime.sendMessage({GST_AUTH_TOKEN: tokenEl.value});
}


