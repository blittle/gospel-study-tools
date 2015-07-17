'use strict';

var ONE_MINUTE = 60 * 1000;

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

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		session.addResource(request);
		chrome.browserAction.setBadgeText({text: request.type.toLowerCase()});
	});

