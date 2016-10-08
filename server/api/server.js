let express = require('express');
let app = express();
let Promise = require('bluebird');
var bodyParser = require('body-parser');
var compression = require('compression');
var cors = require('cors');
var routes = require('./routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({
	strict: false
}));
app.use(compression());

// CORS Configuration
var whiteList = [
	'http://localhost:4200'
];

var corsOptions = {
	origin: function(origin, callback){
		var isOriginWhiteListed = whiteList.indexOf(origin) !== -1;
		callback(null, isOriginWhiteListed);
	},
	credentials: true
};
app.use(cors(corsOptions));
app.disable('x-powered-by');

routes.init(app);

class Server {

	constructor() {
		this.server = null;
	}

	start() {
		var self = this;
		return new Promise((resolve) => {
			this.server = app.listen(3000, function () {
				resolve.call(self, self);
			});
		});
	}

	stop() {
		return new Promise((resolve) => {
			if(this.server) {
				this.server.close(resolve);
			}
		});
	}

	getInstance() {
		return this.server;
	}

	get address() {
		var address = this.server.address();
		var ip = address.address == '::' ? '0.0.0.0' : address.address;
		return 'http://' + ip + ':' + address.port;
	}

}

module.exports = Server;