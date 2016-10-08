var service = require('../../../api/services/ocr_service');
var should = require('should');

describe('OcrService', () => {

	it('should test something', () => {
		return service.detect(__dirname + '/../../../assets/example1.jpg')
			.then((data) => {
				should(data.text[0]).containEql('Adele Bertl');
			});

	});

	it('diag', () => {
		var json = require('../../../assets/ocr-out.json')
		return service.diag(json)
			.then((data) => {

				console.log("there it is", data.content);
			});

	});
});