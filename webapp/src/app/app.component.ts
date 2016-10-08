import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user = {
	image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Michael_Phelps_Rio_Olympics_2016.jpg',
	name: 'Michael Phelps'
  }
}
