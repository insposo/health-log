var controller = require('./controllers/base_controller');

module.exports.init = function (app) {

	app.get('/entries', handle(controller.listEntries));
	app.get('/entries/:id', handle(controller.getEntry));
	app.post('/entries', handle(controller.createEntry));
	app.get('/uploads/:id', handle(controller.downloadFile));

};

function handle(func) {
	return function (req, res) {
		console.log('[' + req.method + ']\t' + req.originalUrl);
		func(req, res);
	}
}