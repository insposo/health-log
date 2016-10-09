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
	private languages:string[] = [];

	ngOnInit() {
		this.hasLanguages = this.checkLanguages();
	}

	getFormattedText(entry:Entry) {
		return Utils.highlightTextFromData(entry);
	}

	toggleDetails() {
		this.showDetails = !this.showDetails;
	}

	checkLanguages() {
		if (this.entry.data) {
			for (let finding of this.entry.data) {
				if (finding.icd10) {
					let content = finding.icd10.content;
					for (let lang in content) {
						if (content.hasOwnProperty(lang) && lang != 'meta:model' && lang != 'msgid' && this.languages.indexOf(lang) == -1) {
							this.languages.push(lang);
						}
					}
				}
			}
		}

		return false;
	}
}
