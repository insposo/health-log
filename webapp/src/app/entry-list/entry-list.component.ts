import {Component, OnInit} from '@angular/core';
import {EntryService} from "../services/entry.service";
import {Entry} from "../models/entry";
import {Utils} from "../core/utils";
import {Router} from "@angular/router";

@Component({
	selector: 'hl-entry-list',
	templateUrl: 'entry-list.component.html'
})
export class EntryListComponent implements OnInit {

	private loading = true;
	private entries:Entry[];

	constructor(private entryService:EntryService, private router: Router) {
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
				});

		setInterval(() => {
			this.refreshEntries();
		}, 3000);
	}

	refreshEntries() {
		this.entryService.getEntries()
			.subscribe(
				entries => {
					entries.forEach((entry, index) => {
						let existingEntry = this.getEntry(entry.id);
						if(existingEntry) {
							existingEntry.status = entry.status;
							existingEntry.image_url = entry.image_url;
							existingEntry.data = entry.data;
							existingEntry.text = entry.text;
						} else {
							this.entries.unshift(entry);
						}
					});
				},
				error => {
					// TODO error handling
				});
	}

	getEntry(id: number) {
		var selected;
		this.entries.forEach((entry) => {
			if(entry.id == id) {
				selected = entry;
			}
		});

		return selected;
	}

	addEntry() {
		this.router.navigate(['/add']);
	}
}
