import {BaseService} from "./base.service";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Entry} from "../models/entry";

@Injectable()
export class EntryService extends BaseService {

	private pathEntries = '/entries';

	constructor(http:Http) {
		super(http);
	}

	getEntries():Observable<Entry[]> {
		//*
		return this.get(this.pathEntries)
			.map(entries => {
				var theEntries = entries as Entry[];
				theEntries.forEach(entry => {
					switch(entry.author) {
						case 'athlete':
							entry.author = {
								name: 'Matthias Steiner',
								image_url: 'http://polpix.sueddeutsche.com/bild/1.1631738.1363976522/940x528/gewichtheber-matthias-steiner-karriere-ende.jpg'
							};
							break;
						case 'trainer':
							entry.author = {
								name: 'You',
								image_url: 'https://pmcdeadline2.files.wordpress.com/2014/08/arnold-schwarzenegger-featured-image.jpg?w=630'
							}
					}

					if(entry.image_url) {
						entry.image_url = this.constructApiUrl('/' + entry.image_url);
					}
				});


				return theEntries;
			});
		//*/

		/*
		let entry = {
			id: 1,
			status: 'done',
			date: '2016-01-01',
			author: {
				name: 'Jörgen Klöpp',
				image_url: 'http://mediadb.kicker.de/2014/fussball/trainer/xl/2641_17_201371015557844.jpg'
			},
			text: "Wir haben leider keinen Anhalt für renale Secundaria gefunden. Das ist ziemlich schade.",
			data: [{
				"status": "negative",
				"range": [12, 34],
				"text": "keinen Anhalt für renale Secundaria",
				"icd10": {
					"id": "AC79.0",
					"content": {
						"meta:model": "gnuhealth.pathology",
						"msgid": "Secondary malignant neoplasm of other sites",
						"es_EC": "Tumor maligno secundario de otros sitios",
						"es_ES": "Tumor maligno secundario de otros sitios",
						"ja_JP": "その他の部位の続発性悪性新生物",
						"pt_BR": "neoplasia maligna secundária de outros locais",
						"zh_CN": "其它部位继发恶性肿瘤"
					}
				},
				"link": "http://lmgtfy.com/?q=ICD10%3AC79.0"
			},{
				"status": "negative",
				"range": [2, 6],
				"text": "keinen Anhalt für renale Secundaria",
				"icd10": {
					"id": "AC79.0",
					"content": {
						"meta:model": "gnuhealth.pathology",
						"msgid": "Secondary malignant neoplasm of other sites",
						"es_EC": "Tumor maligno secundario de otros sitios",
						"es_ES": "Tumor maligno secundario de otros sitios",
						"ja_JP": "その他の部位の続発性悪性新生物",
						"pt_BR": "neoplasia maligna secundária de outros locais",
						"zh_CN": "其它部位继发恶性肿瘤"
					}
				},
				"link": "http://lmgtfy.com/?q=ICD10%3AC79.0"
			},{
				"status": "negative",
				"range": [40, 45],
				"text": "keinen Anhalt für renale Secundaria",
				"icd10": {
					"id": "AC79.0",
					"content": {
						"meta:model": "gnuhealth.pathology",
						"msgid": "Secondary malignant neoplasm of other sites",
						"es_EC": "Tumor maligno secundario de otros sitios",
						"es_ES": "Tumor maligno secundario de otros sitios",
						"ja_JP": "その他の部位の続発性悪性新生物",
						"pt_BR": "neoplasia maligna secundária de outros locais",
						"zh_CN": "其它部位继发恶性肿瘤"
					}
				},
				"link": "http://lmgtfy.com/?q=ICD10%3AC79.0"
			}]
		};

		return Observable.of([
			entry,
			entry,
			entry,
			entry
		] as Entry[]);
		//*/
	}

	getEntry(id:number):Observable<Entry> {
		let path = `/${id}`;
		return this.get(this.pathEntries + path);
	}

	createEntry(data):Observable<Entry> {
		return this.post(this.pathEntries, data);
	}
}
