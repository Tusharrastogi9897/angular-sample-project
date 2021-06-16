import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../Shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../Shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

	submitFeedback(feedback: Feedback): Observable<Feedback>{
		const httpOptions = {
		headers: new HttpHeaders({
		'Content-Type': 'application/json'
		})
		};
		return this.http.post<Feedback>(baseURL + 'feedback',feedback,httpOptions)
		.pipe(catchError(this.phms.handleError));
	}

  constructor(private http: HttpClient, private phms: ProcessHTTPMsgService) { }
}
