let Server = require("./api/server");
let instance = new Server();

instance.start()
	.then(() => {
		console.log(`Server running on ${instance.address}`);
	});