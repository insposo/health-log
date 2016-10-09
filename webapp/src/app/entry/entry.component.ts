import {OnInit, Component, Input} from "@angular/core";
import {Entry} from "../models/entry";
import {Utils} from "../core/utils";

@Component({
	selector: 'hl-entry',
	templateUrl: 'entry.component.html'
})
export class EntryComponent implements OnInit {

	@Input() entry:Entry;
	private showDetails = false;
	private hasLanguages = false;
	private languages: string[] = [];
	private showMoreDetailsButton = true;
	private currentLanguage: string;

	ngOnInit() {
		this.hasLanguages = this.checkLanguages();

		if(this.entry.data && !this.entry.data.length) {
			this.showMoreDetailsButton = false;
		}

		setInterval(() => {
			this.languages = [];
			this.hasLanguages = this.checkLanguages();
		}, 3000);
	}

	getFormattedText(entry:Entry) {
		return Utils.highlightTextFromData(entry);
	}

	toggleDetails() {
		this.showDetails = !this.showDetails;
	}

	checkLanguages() {
		let baseCounter = 0;

		if (this.entry.data) {
			this.languages.push("de");
			baseCounter++;

			for (let finding of this.entry.data) {
				if (finding.icd10) {
					let content = finding.icd10.content;

					this.languages.push("en");
					baseCounter++;

					for (let lang in content) {
						if (content.hasOwnProperty(lang) && lang != 'meta:model' && lang != 'msgid' && this.languages.indexOf(lang) == -1) {
							this.languages.push(lang);
						}
					}
				}
			}
		}

		return (this.languages.length != 0 && this.languages.length > baseCounter);
	}

	getTextForFinding(item) {
		if(!this.currentLanguage) {
			return item.text;
		}

		var text = item.icd10.content[this.currentLanguage];
		var fallback = item.icd10.content['msgid'];
		if(text) {
			return text;
		} else {
			return fallback;
		}
	}

	changeLanguage(code: string) {
		if(code == 'de') {
			this.currentLanguage = null;
		} else {
			this.currentLanguage = code;
		}
	}
}
