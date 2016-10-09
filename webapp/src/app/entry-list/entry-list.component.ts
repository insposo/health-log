import {Component, OnInit} from '@angular/core';
import {EntryService} from "../services/entry.service";
import {Entry} from "../models/entry";
import {Utils} from "../core/utils";

@Component({
	selector: 'hl-entry-list',
	templateUrl: 'entry-list.component.html'
})
export class EntryListComponent implements OnInit {

	private loading = true;
	private entries:Entry[];
	private showDetails:Boolean = false;

	constructor(private entryService:EntryService) {
	}

	ngOnInit() {
		this.entryService.getEntries()
			.subscribe(
				entries => {
					this.entries = entries;
					this.loading = false;
				},
				error => {
					// TODO error handling
				})


		setInterval(this.refreshPendingEntries(), 1000);
	}

	refreshPendingEntries() {
		if(!this.entries) {
			return;
		}

		this.entries.forEach((entry, i) => {
			if (entry.status == 'pending') {
				this.refreshEntry(entry, i);
			}
		});
	}

	refreshEntry(entry, index) {
		this.entryService.getEntry(entry.id)
			.subscribe(entry => {
				if (entry.status !== 'pending') {
					this.entries[index] = entry;
				}
			})
	}

	getFormattedText(entry: Entry) {
		return Utils.highlightTextFromData(entry);
	}

	toggleDetails() {
		this.showDetails = !this.showDetails;
	}
}
