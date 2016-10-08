var repo = require('../repositories/base_repository');

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

	}


}

module.exports = new BaseController();
