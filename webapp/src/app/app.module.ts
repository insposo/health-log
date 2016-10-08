import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MaterialModule, MdIconRegistry} from "@angular/material";
import {EntryService} from "./services/entry.service";
import {EntryListComponent} from "./entry-list/entry-list.component";
import {routing} from "./app.routing";
import {AddEntryComponent} from "./add-entry/add-entry.component";
import {RouterModule} from "@angular/router";

@NgModule({
	declarations: [
		AppComponent,
		EntryListComponent,
		AddEntryComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		RouterModule,
		routing
	],
	providers: [
		MdIconRegistry,
		EntryService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
