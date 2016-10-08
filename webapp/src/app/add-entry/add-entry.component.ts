import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {EntryService} from "../services/entry.service";
import {Router} from "@angular/router";


@Component({
	selector: 'hlth-add-entry',
	templateUrl: 'add-entry.component.html'
})
export class AddEntryComponent implements OnInit {

	private uploader:FileUploader = new FileUploader({url: environment.apiUrl + '/entries'});
	private hasBaseDropZoneOver:boolean = false;

	private loading:boolean = false;
	private text:string;
	private textResponseStatus:string;

	fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

	constructor(private entryService:EntryService, private router:Router) {
	}

	ngOnInit() {

	}

	sendTextUpload() {
		this.loading = true;

		let data = {
			text: this.text
		};

		this.entryService.createEntry(data)
			.subscribe(entry => {
					this.textResponseStatus = 'Upload succeeded!';
					this.loading = false;
					this.text = '';
					this.router.navigate(['/']);
				},
				error => {
					this.textResponseStatus = 'Upload failed.';
					this.loading = false;
				});
	}
}
