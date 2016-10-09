import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "./models/user";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {

	private user: User = {
		name: 'Matthias Steiner',
		image_url: 'http://polpix.sueddeutsche.com/bild/1.1631738.1363976522/940x528/gewichtheber-matthias-steiner-karriere-ende.jpg'
	};

	constructor(private router: Router) {

	}


}
