import {Component, OnInit} from '@angular/core';
import {EntryService} from "../services/entry.service";
import {Entry} from "../models/entry";

@Component({
	selector: 'hlth-entry-list',
	templateUrl: 'entry-list.component.html'
})
export class EntryListComponent implements OnInit {

	private loading = true;
	private entries: Entry[];

	constructor(private entryService: EntryService) {
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
	}

}
