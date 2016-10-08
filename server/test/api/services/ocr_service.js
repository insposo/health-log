var service = require('../../../api/services/ocr_service');
var should = require('should');

describe('OcrService', () => {

	it('should test something', () => {
		return service.detect(__dirname + '/../../../assets/example1.jpg')
			.then((data) => {
				should(data.text[0]).containEql('Adele Bertl');
			});

	});

});