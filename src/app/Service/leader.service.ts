import { Injectable } from '@angular/core';
import { Leader } from '../Shared/leaders';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../Shared/baseurl';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
	
	getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.phms.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.phms.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leader => leader[0]))
    .pipe(catchError(this.phms.handleError));
  }

  constructor(private http: HttpClient, private phms: ProcessHTTPMsgService) { }
}
