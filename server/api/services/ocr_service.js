var vision = require('@google-cloud/vision')({
	projectId: 'trayn-berg-39-1090',
	keyFilename: __dirname + '/../../trayn-0a6db519a313.json'
});

class OcrService {

	detect(img) {
		return new Promise((resolve, reject) => {
			vision.detectText(img, (err, text, apiResponse) => {
				if (err) {
					reject(err);
				} else {
					resolve({ text: text, response: apiResponse });
				}
			});
		});
	}

}

module.exports = new OcrService();