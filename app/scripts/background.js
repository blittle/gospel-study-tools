'use strict';

var ONE_MINUTE = 60 * 1000;
var HOST = "http://0.0.0.0:4567"

var isAuthenticated = false;

var Session = function() {
	this.resources = {};
}

Session.prototype.addResource = function(resource) {
	if (!this.resources[resource.type]) {
		this.resources[resource.type] = [];
	}

	var existingResource = _.find(this.resources[resource.type], _.extend(resource, {
		end: false
	}));

	if (!existingResource) {
		this._createResource(resource);
	} else {
		this._updateResource(existingResource);
	}
}

Session.prototype._createResource = function(resource) {
	resource.start = new Date().getTime();
	resource.end = false;
	this.resources[resource.type].push(resource);
	this._startTimeout(resource);
}

Session.prototype._updateResource = function(resource) {
	clearTimeout(resource.timeout);
	this._startTimeout(resource);
}

Session.prototype._startTimeout = function(resource) {
	resource.timeout = setTimeout(function() {
		resource.end = new Date().getTime();
	}, ONE_MINUTE);
}

var session = new Session();
checkAuthentication();

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.GST_AUTH_TOKEN) {
			chrome.storage.sync.set({'GST_AUTH_TOKEN': request.GST_AUTH_TOKEN}, checkAuthentication);
		} else {
			session.addResource(request);
			chrome.browserAction.setBadgeText({
				text: request.type.toLowerCase()
			});
		}
	});


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

chrome.browserAction.onClicked.addListener(function (tab) {
	if (!isAuthenticated) {
		chrome.tabs.create({ url: HOST + '/authenticate/google' });
	}
});
