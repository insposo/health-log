import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	private user = {
		image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Michael_Phelps_Rio_Olympics_2016.jpg',
		name: 'Michael Phelps'
	}

	constructor(private router: Router) {

	}

	addEntry() {
		this.router.navigate(['/add']);
	}


}
