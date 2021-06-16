import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../Shared/dishes';
import { visibility, flyInOut, expand } from '../Animation/app.animation';
import { DishService } from '../Service/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../Shared/comment';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
    host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishDetailComponent implements OnInit {
	
	@ViewChild ('cform') commentFormDirective;

	visibility = 'shown';
	date: Date = new Date();
	dish: Dish;
	dishcopy: Dish;
	dishIds: string[];
	prev: string;
	next: string;
	errMess: string;

	commentForm: FormGroup;
	comment: Comment;

	formErrors = {
	'author':'',
	'comment':''
	};

	validationMessage = {
	'author': {
	'required': 'Author Name is required.',
	'minlength': 'Minimum length must at least 2 characters long.',
	'maxlength': 'Maximum length should not be more than 25 characters.'
	},
	'comment': {'required': 'Comment is required'}
	};

  constructor(private dishservice: DishService, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, @Inject('BaseURL') private BaseURL) { this.buildForm(); }

  buildForm(){
  	this.commentForm = this.fb.group({
  	rating: 5,
  	comment: ['', Validators.required],
  	author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  	date: ''
  	});
  	this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
  	this.onValueChanged();
  }

   onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessage[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit() {
  	this.dishservice.getDishIds().subscribe(id => this.dishIds = id);
   this.route.params.pipe(switchMap((param: Params) => {
   this.visibility='hidden';
   return this.dishservice.getDish(param['id']);}))
   .subscribe(dish => {this.dish = dish; this.dishcopy=dish; this.setPrevNext(dish.id);this.visibility='shown';});
   }

  onSubmit() { 
    this.comment = this.commentForm.value;
    this.comment.date = this.date.toISOString();
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    });
    this.commentFormDirective.resetForm();
	    }

  setPrevNext(id: string){
  const index = this.dishIds.indexOf(id);
  this.prev = this.dishIds[(this.dishIds.length + index -1) % this.dishIds.length];
  this.next = this.dishIds[(this.dishIds.length + index +1) % this.dishIds.length];
  }

  goBack(): void{
  this.location.back();
  }

}
