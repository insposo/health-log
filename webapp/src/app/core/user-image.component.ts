
import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {User} from "../models/user";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'hl-user-image',
    template: `<div class="user-image" [style.background-image]="backgroundImageStyle"></div>`
})
export class UserImageComponent implements OnInit {

	@Input() user: User;
	backgroundImageStyle;

	constructor(private domSanitizer: DomSanitizer) {
	}

	ngOnInit() {
		this.backgroundImageStyle = this.domSanitizer.bypassSecurityTrustStyle('url(' + this.user.image_url + ')');
	}

}
