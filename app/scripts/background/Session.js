import { ONE_MINUTE } from '../constants.js';

export default class Session {
	constructor(json) {
		if (json) {
			this.resources = json;

			_.each(this.resources, (resource, type) => {
				resource.forEach((resource) => {
					if (!resource.end) {
						resource.end = resource.updated + ONE_MINUTE;
					}
				});
			})
		} else {
			this.resources = {};
		}
	}

	getJSON() {
		return JSON.stringify(this.resources);
	}

	addResource(resource) {
		if (!this.resources[resource.type]) {
			this.resources[resource.type] = [];
		}

		let existingResource = _.find(this.resources[resource.type], _.extend(resource, {
			end: false
		}));

		if (!existingResource) {
			this._createResource(resource);
		} else {
			this._updateResource(existingResource);
		}
	}

	getProcessedSession() {
		let startTime = this._getStartTime();
		let endTime = this._getEndTime();

		return {
			resources: this._fixResourceTimings(
				endTime - startTime,
				this._groupResources()
			),
			startTime,
			endTime
		};
	}

	_getEndTime() {
		return _.reduce(this.resources, (highestFound, resourceTypes) => {
			let end = resourceTypes.reduce((found, resource) => {
				if (!found || resource.end > found) {
					return resource.end;
				}
				return found;
			}, null);

			if (!highestFound || end > highestFound) {
				return end;
			}

			return highestFound;
		}, null);
	}

	_getStartTime() {
		return _.reduce(this.resources, (lowestFound, resourceTypes) => {
			let start = resourceTypes.reduce((found, resource) => {
				if (!found || resource.start < found) {
					return resource.start;
				}
				return found;
			}, null);

			if (!lowestFound || start < lowestFound) {
				return start;
			}

			return lowestFound;
		}, null);
	}

	_groupResources() {
		let resources = {};
		_.each(this.resources, (resource, type) => {
			resources[type] = [];
			resource.forEach((r) => {
				let search = _.clone(r);
				delete search.start;
				delete search.end;
				delete search.updated;
				delete search.timeout;

				let resourcesOfSameType = _.filter(resource, search);

				search.time = _.reduce(resourcesOfSameType, (total, r) => {
					return total + (r.end - r.start);
				}, 0);

				resources[type].push(search);
			});
		});

		return _.reduce(resources, (allResources, resource) => {
			return _.union(allResources, resource);
		}, [])
	}

	_fixResourceTimings(totalTime, resources) {
		let totalDynamicTime = _.reduce(resources, (total, resource) => {
			return total + resource.time;
		}, 0);

		const ratio = totalTime / totalDynamicTime;

		return resources.map((resource) => {
			resource.time = resource.time * ratio;
			return resource;
		});
	}

	_createResource(resource) {
		resource.start = new Date().getTime();
		resource.updated = new Date().getTime();
		resource.end = false;
		this.resources[resource.type].push(resource);
		this._startTimeout(resource);
	}

	_updateResource(resource) {
		clearTimeout(resource.timeout);
		resource.updated = new Date().getTime();
		this._startTimeout(resource);
	}

	_startTimeout(resource) {
		resource.timeout = setTimeout(function() {
			resource.end = new Date().getTime();
		}, ONE_MINUTE);
	}
}
