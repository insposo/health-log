import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "./models/user";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {

	private user: User = {
		image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Michael_Phelps_Rio_Olympics_2016.jpg',
		name: 'Michael Phelps'
	}

	constructor(private router: Router) {

	}


}
