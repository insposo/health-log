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

	addEntry() {
		this.router.navigate(['/add']);
	}
}
