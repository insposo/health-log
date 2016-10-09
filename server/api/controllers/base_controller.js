var repo = require('../repositories/log_entry_repository');
var service = require('../services/ocr_service');
var s3Service = require('../services/s3_service');
var fs = require('fs');
var mimeTypes = require('mime-types');

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

	downloadFile(req, res) {
		var id = req.params.id;
		s3Service.getUrl('uploads/' + id)
			.then((url) => {
				res.redirect(url);
			})
			.catch((err) => {
				res.status(500).send(err);
			});
	}

	createEntry(req, res) {
		var file = req.files.file;
		var text = req.body.text;
		if (file) {
			let id;
			let stream = fs.createReadStream(file.path);
			s3Service.uploadStream(file.path, stream, mimeTypes.lookup(file.path))
				.then(() => {
					return repo.saveFileEntry('athlete', file.path);
				})
				.then((entry) => {
					id = entry.id;
					res.send(entry);
					return service.detectText(file.path);
				})
				.then((text) => {
					return repo.save({
						id: id,
						text: text
					})
				})
				.then((entry) => {
					return service.diag(entry.text)
				})
				.then((data) => {
					return repo.finalizeEntry(id, data)
				})
				.catch((err) => {
					console.error(err.stack);
					return repo.entryFailed(id);
				});
		} else if (text) {
			let id;
			repo.saveTextEntry('athlete', text)
				.then((entry) => {
					id = entry.id;
					res.send(entry);
					return service.diag(text);
				})
				.then((data) => {
					return repo.finalizeEntry(id, data)
				})
				.catch((err) => {
					console.error(err.stack);
					return repo.entryFailed(id);
				});
		} else {
			res.status(400).send(JSON.stringify({works: 'nope'}));
		}
	}

	diagnose(req, res) {
		var content = req.body;
		res.send(service.diag(content))
	}

}

module.exports = new BaseController();
