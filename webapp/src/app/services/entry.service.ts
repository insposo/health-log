
import {BaseService} from "./base.service";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Entry} from "../models/entry";

@Injectable()
export class EntryService extends BaseService {

	private pathEntries: '/entries';

	constructor(http: Http) {
		super(http);
	}

	getEntries(): Observable<Entry[]> {
		//return this.get(this.pathEntries);
		return Observable.of([
			{
				id: 1,
				status: 'PENDING',
				date: '2016-01-01'
			},
			{
				id: 1,
				status: 'DONE',
				date: '2016-01-01'
			},
			{
				id: 1,
				status: 'DONE',
				date: '2016-01-01'
			},
			{
				id: 1,
				status: 'DONE',
				date: '2016-01-01'
			}
		] as Entry[])
	}

	getEntry(id: number): Observable<Entry> {
		let path = `/${id}`;
		return this.get(this.pathEntries + path);
	}

}
