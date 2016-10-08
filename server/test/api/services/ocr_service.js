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
		var json = require('../../../assets/mla-in.json')
		return service.diag(json.text)
			.then((data) => {
				should(data[0].icd10.id).eql('S52.4')
			});

	});
});