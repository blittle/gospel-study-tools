import { throttle } from '../utils.js';
import { ONE_MINUTE } from '../constants';
import resourceHandlers from './resource-handlers.js';

/**
 * Send the main background thread a notification about
 * a study resource. Throttled cause we don't want to constantly
 * send events (especially in the case of scroll)
 */
let sendResourceNotification = throttle(() => {
	if (!pageResource) return;

	chrome.runtime.sendMessage(pageResource, console.log);
}, ONE_MINUTE);

/**
 * Parse the type of resource from the URL. Dependening on the
 * resource type, this might also parse the DOM. This proxies
 * to predefined resource handlers. Only the first handler that
 * maches the URL is used.
 */
function getResourceFromURL(url) {
	for (var name in resourceHandlers) {
		if (resourceHandlers.hasOwnProperty(name)) {
			var handler = resourceHandlers[name];
			if (handler.regex.test(url)) {
				return handler.getResource.call(null, handler.regex.exec(url))
			}
		}
	}
}

let pageResource = getResourceFromURL(window.location.pathname);

if (pageResource) {
	sendResourceNotification();
}

document.body.onclick = function() {
	// Each time the user clicks, send a new resource notification.
	sendResourceNotification();
}

document.body.onscroll = function() {
	// Each time the user scrolls, send a new resource notification.
	sendResourceNotification();
}
