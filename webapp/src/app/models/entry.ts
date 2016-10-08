import {User} from "./user";
import {EntryFinding} from "./entry-finding";

export class Entry {

	id: number;
	status: string;
	date: string;
	author: User;
	text: string;
	data: EntryFinding[];

}
