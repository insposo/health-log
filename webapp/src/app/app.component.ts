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
		image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Matthias_Steiner_(weightlifter)_2.jpg/220px-Matthias_Steiner_(weightlifter)_2.jpg'
	};

	constructor(private router: Router) {

	}


}
