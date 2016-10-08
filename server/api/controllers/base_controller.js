var repo = require('../repositories/log_entry_repository');
var service = require('../services/ocr_service');

class BaseController {

	listEntries(req, res) {
		repo.list()
			.then((entries) => {
				res.send(entries);
			});
	}

	getEntry(req, res) {
		repo.findById(req.params.id)
			.then((entry) => {
				if (entry) {
					res.send(entry);
				} else {
					res.status(404).send();
				}
			});
	}

	createEntry(req, res) {
		var file = req.files.file;
		if (file) {
			let id;
			repo.saveFileEntry('athlete', file.path)
				.then((entry) => {
					id = entry.id;
					res.send(entry);
					return service.detect(file.path);
				})
				.then((data) => {
					return repo.finalizeEntry(id, data)
				})
				.catch((err) => {
					console.error(err.stack);
				});
		}

	}
}

module.exports = new BaseController();
