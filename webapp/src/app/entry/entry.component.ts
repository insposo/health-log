import {OnInit, Component, Input} from "@angular/core";
import {Entry} from "../models/entry";
import {Utils} from "../core/utils";

@Component({
	selector: 'hl-entry',
	templateUrl: 'entry.component.html'
})
export class EntryComponent implements OnInit {

	@Input() entry: Entry;
	private showDetails:Boolean = false;
	private hasLanguages:Boolean = false;
	private languages:Array = [];

	ngOnInit() {
		this.hasLanguages = checkLanguages();
	}

	getFormattedText(entry: Entry) {
		return Utils.highlightTextFromData(entry);
	}

	toggleDetails() {
		this.showDetails = !this.showDetails;
	}

	checkLanguages() {
		if (this.entry.data.icd10) {

			let content = this.entry.data.icd10.content;
			for(let lang of content) {

			}
		}
	}
}
