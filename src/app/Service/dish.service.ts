import { Injectable } from '@angular/core';
import { Dish } from '../Shared/dishes';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../Shared/baseurl';
import { ProcessHTTPMsgService } from '../Service/process-httpmsg.service';
import { Dishes } from '../Shared/dishes1';

@Injectable({
  providedIn: 'root'
})
export class DishService {

	getDishes(): Dish[] {
	 return Dishes;
  }

  getDish(id: string): Dish {
    return Dishes.filter((dish) => dish.id === id)[0];
  }

  getFeaturedDish(): Dish {
    return Dishes.filter((dish) => dish.featured)[0];
  }

  getDishIds(): string[] | any{
  	return Dishes.map(dish => dish.id);
  }

  putDish(dish: Dish) {
    return Dishes.push(dish);
      }

  constructor(private http: HttpClient, private processHttpMsgService: ProcessHTTPMsgService) { }
}
