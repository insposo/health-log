var po = require("pofile");
var Promise = require("bluebird");
var fs = require("fs");

var dir = "assets/icd10/gnuhealth/locale";
var files = fs.readdirSync(dir, {});

var translations = {};

var promises = [];
files.forEach(function(f) {
	if (f.endsWith(".po")) {
		var lang = f.substr(0, f.length-3);
		var path = dir + "/" + f;
		promises.push(new Promise((resolve, reject) => {
			po.load(path, function(err, p) {
				if (err) {
					reject(err);
				}
				p.items.forEach(function(i) {
					var o = {};
                    var text = i.msgstr.join(" | ");
                    if (text) {
                        var gnuMeta = i.msgctxt;
                        var id;
                        if (gnuMeta) {
                            gnuMeta.split(",").forEach(function(s) {
                                var kv = s.split(":");
                                var key = kv[0];
                                var value = kv[1];
                                if (key !== "name") {
                                    o["meta:" + key] = value;
                                } else {
                                    id = value;
                                }
                            })
                        }

                        if (id) {
                            var o1 = translations[id];
                            if (!o1) {
                                translations[id] = o;
                            } else {
                                o = o1;
                            }
                        }

                        o.msgid = i.msgid;
                        o[lang] = text;
                    }
				});
                resolve();
			});
		}));
	}
});

Promise.all(promises).then((pos) => {
	console.log("Processed", pos.length, "PO files, writing 'translations.json'.")
	fs.writeFileSync("assets/icd10/icd10.json", JSON.stringify(translations, null, 4));
});
