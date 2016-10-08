import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
	selector: 'hl-add-entry',
	templateUrl: 'add-entry.component.html'
})
export class AddEntryComponent implements OnInit {

	public uploader:FileUploader = new FileUploader({url: environment.apiUrl + '/fileupload'});
	public hasBaseDropZoneOver:boolean = false;

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

	constructor() {}

	ngOnInit() {

	}
}
