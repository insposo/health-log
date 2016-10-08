import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MaterialModule, MdIconRegistry} from "@angular/material";
import {EntryService} from "./services/entry.service";
import {EntryListComponent} from "./entry-list/entry-list.component";

@NgModule({
	declarations: [
		AppComponent,
		EntryListComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule
	],
	providers: [
		MdIconRegistry,
		EntryService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
