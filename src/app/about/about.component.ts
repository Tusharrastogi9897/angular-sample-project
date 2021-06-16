import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../Shared/leaders';
import { LeaderService } from '../Service/leader.service';
import { flyInOut, expand } from '../Animation/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
    host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

	leader : Leader[];
	errMess: string;

  constructor(private leaderservice: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
  this.leaderservice.getLeaders().subscribe(leaders => this.leader = leaders, error => this.errMess = error);
  }

}
