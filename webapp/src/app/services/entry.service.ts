
import {BaseService} from "./base.service";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
export class EntryService extends BaseService {

	private pathEntries: '/entries';

	constructor(http: Http) {
		super(http);
	}

	getEntries(): Observable<Entry[]> {
		return this.get(this.pathEntries);
	}

	getEntry(id: number): Observable<Entry> {
		let path = `/${id}`;
		return this.get(this.pathEntries + path);
	}

}
