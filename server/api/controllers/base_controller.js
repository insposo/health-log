var repo = require('../repositories/base_repository');
var service = require('../services/ocr_service');

class BaseController {

	listEntries(req, res) {
		repo.list()
			.then((entries) => {
				res.send(entries);
			});
	}

	getEntry(req, res) {
		repo.find(req.params.id)
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

			service.detect(file.path)
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					res.status(500).send(err);
				});
		}

	}


}

module.exports = new BaseController();
