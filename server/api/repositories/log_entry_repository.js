var LogEntry = require('../models/log_entry');
var BaseRepository = require('./base_repository');
var _ = require('lodash');
var getIcd10Translation = require('../services/icd10_service');


class LogEntryRepository extends BaseRepository{

	constructor() {
		super(LogEntry);
	}

	list(attributes = {}) {
		return super.list(attributes)
			.then((items) => {
				if (!items) {
					return [];
				}
				return _.map(items, (item) => {
					return _.defaults({
						data: JSON.parse(item.data)
					}, item)
				})
			});
	}

	saveFileEntry(author, path) {
		return this.save({
			date: new Date(),
			author: author,
			image_url: path,
			status: LogEntryRepository.Status.pending
		});
	}

	saveTextEntry(author, text) {
		return this.save({
			date: new Date(),
			author: author,
			text: text,
			status: LogEntryRepository.Status.pending
		});
	}

	finalizeEntry(id, data) {
		var mapped = _.map(data, (item) => {
			let id = item.icd10.id.split('.')[0];
			var icd = {
				id: item.icd10.id,
				content: getIcd10Translation(id)
			};
			return _.defaults({
				icd10: icd
			}, item);
		});
		return this.save({
			id: id,
			data: JSON.stringify(mapped),
			status: LogEntryRepository.Status.done
		});
	}
}

LogEntryRepository.Status = {
	pending: 'pending',
	error: 'error',
	done: 'done'
};

module.exports = new LogEntryRepository();