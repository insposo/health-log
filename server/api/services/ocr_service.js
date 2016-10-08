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
                    var data = [];

                    var meta = body.metadata;
                    if (meta) {
                        if (meta.textfacets) {
                            meta.textfacets.forEach((f) => {
                                var m = {
                                    status: f.path[1],
                                    range: [ f.begin, f.end ]
                                };

                                var keyword = f.keyword;
                                if (keyword) {
                                    var kv = keyword.split("#");
                                    m.text = kv[0];
                                    m.link = googleSearchLink(m.text);
                                    var posIcd = kv[1].indexOf("ICD10:");
                                    if (posIcd > -1) {
                                        var id = kv[1].substring(posIcd + 6);
                                        m.link = "http://www.icd-code.de/icd/code/" + id;
                                        m.icd10 = { id: id }
                                    }
                                }
                                data.push(m);
                            })
                        }
                    }

                    resolve(data)
                }
            });
        })
    }
}

var googleSearchLink = function(text) {
    return "http://www.google.com/search?q=" + text;
};

module.exports = new OcrService();