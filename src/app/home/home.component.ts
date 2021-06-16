import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../Shared/dishes';
import { DishService } from '../Service/dish.service';
import { Promotion } from '../Shared/promotions';
import { PromotionService } from '../Service/promotion.service';
import { Leader } from '../Shared/leaders';
import { LeaderService } from '../Service/leader.service'; 
import { flyInOut, expand } from '../Animation/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
    host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  disherror: string;
  leadererror: string;
  promoerror: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotionservice.getFeaturedPromotion().subscribe(promo => this.promotion = promo,
     error => this.promoerror = error);
    this.leaderservice.getFeaturedLeader().subscribe(leder => this.leader = leder, error => this.leadererror = error);
  }

}
