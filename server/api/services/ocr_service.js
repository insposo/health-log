var vision = require('@google-cloud/vision')({
	projectId: 'trayn-berg-39-1090',
	keyFilename: __dirname + '/../../trayn-0a6db519a313.json'
});
var request = require("request");
require("../../config");

class OcrService {

	detect(img) {
		return new Promise((resolve, reject) => {
			vision.detectText(img, (err, text, apiResponse) => {
				if (err) {
					reject(err);
				} else {
					resolve(text[0]);
				}
			});
		});
	}

    diag(text) {
        return new Promise((resolve, reject) => {
            var options = { method: 'POST',
                url: 'https://api.eu.apiconnect.ibmcloud.com/g-cloud-dev/cognitive-apis/mla/1.0.2/diagnosis',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'x-ibm-client-id': process.env.MLA_CLIENT_ID,
                    'x-ibm-client-secret': process.env.MLA_CLIENT_SECRET,
                },
                body: { text: text },
                json: true
            };

            request(options, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve({content: body, response: response})
                }
            });
        })
    }
}

module.exports = new OcrService();