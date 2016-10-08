var controller = require('./controllers/base_controller');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({ uploadDir: './uploads' });

module.exports.init = function (app) {

	app.get('/entries', controller.listEntries);
	app.get('/entries/:id', controller.getEntry);
	app.post('/entries', multipartyMiddleware, controller.createEntry);

};