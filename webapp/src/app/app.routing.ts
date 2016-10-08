import {Routes, RouterModule} from '@angular/router';

import {EntryListComponent} from "./entry-list/entry-list.component";
import {AddEntryComponent} from "./add-entry/add-entry.component";

export const appRoutes: Routes = [
	{
		path: '',
		component: EntryListComponent
	},
	{
		path: 'add',
		component: AddEntryComponent
	}
];

export const routing = RouterModule.forRoot(appRoutes);
