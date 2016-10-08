var translations = require('../../assets/icd10/icd10.json');

module.exports = function (id) {
	return translations[id];
};