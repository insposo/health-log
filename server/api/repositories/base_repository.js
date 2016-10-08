var entries = [];
var _ = require('lodash');
var Promise = require("bluebird");

class BaseRepository {

	list() {
		return new Promise((resolve) => {
			resolve(entries);
		});
	}

	find(id) {
		return new Promise((resolve) => {
			let entry = _.find(entries, (entry) => {
				return entry.id == id;
			});
			resolve(entry);
		});
	}

	create(entry) {
		return new Promise((resolve) => {
			entries.push(entry);
			resolve(entry);
		});
	}

}

module.exports = new BaseRepository();