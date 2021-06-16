import { Injectable } from '@angular/core';
import { Promotion } from '../Shared/promotions';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../Shared/baseurl';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
 
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.phms.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/'+ id)
    .pipe(catchError(this.phms.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promo => promo[0]))
    .pipe(catchError(this.phms.handleError));
  }

  constructor(private http: HttpClient, private phms: ProcessHTTPMsgService) { }
}
