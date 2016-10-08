var LogEntry = require('../models/log_entry');
var BaseRepository = require('./base_repository');



class LogEntryRepository extends BaseRepository{

	constructor() {
		super(LogEntry);
	}

	saveFileEntry(author, path) {
		return this.save({
			date: new Date(),
			author: author,
			image_url: path,
			status: LogEntryRepository.Status.pending
		});
	}

	finalizeEntry(id, data) {
		return this.save({
			id: id,
			data: data,
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