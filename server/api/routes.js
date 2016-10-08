var controller = require('./controllers/base_controller');

module.exports.init = function (app) {

	app.get('/entries', controller.listEntries);
	app.get('/entries/:id', controller.getEntry);
	app.post('/entries', controller.createEntry);

};