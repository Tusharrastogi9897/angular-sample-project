import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../Shared/dishes';

import { DishService } from '../Service/dish.service';
import { flyInOut, expand } from '../Animation/app.animation';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
    host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

	dishes: Dish[];
	errMess: string;

  constructor(private dishservice : DishService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishes = this.dishservice.getDishes();
  }
}
