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
import {FileUploadModule} from "ng2-file-upload/ng2-file-upload";
import {UserImageComponent} from "./core/user-image.component";
import {EntryComponent} from "./entry/entry.component";

@NgModule({
	declarations: [
		AppComponent,
		EntryListComponent,
		AddEntryComponent,
		UserImageComponent,
		EntryComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule.forRoot(),
		RouterModule,
		FileUploadModule,
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
