import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map ,catchError, mapTo, subscribeOn} from 'rxjs/operators';
import { User } from '../../../models/User.js';
import { Book } from '../../../models/Book.js';
declare var require: any;
// var mongoose = require('mongoose');



import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

// import { User } from '../_models/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  quantity:number=0;
  billingAddress:string='';
  shippingAddress:string='';
  amount:number=0;  
  order: any;  
  book:Observable<any>;
  user:any;
  
  constructor(private api: ApiService,private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    
    let userid;
    var userdata;
    this.orderForm = this.formBuilder.group({
      'quantity' : [null, Validators.required],
      'billingAddress' : [null, Validators.required],
      'shippingAddress' : [null, Validators.required],
      'amount' : [null, Validators.required],
      'books' : [null],
      'user'  : [null]      
    });
    
      this.getuser()
      .subscribe(_ => {;
        console.log('ngOnit after getUsers() ');
      });   
      this.getBook()
      .subscribe(_ => {;
        console.log('ngOnit after getbook() ');
      });     
  }
  getuser(){    
    var data = JSON.parse(localStorage.getItem("currentUser"));
     return this.api.getUser(data['_id']).pipe(
      map((users) => {
        console.log('users ' + users);
        // this.orderForm.patchValue({'user': mongoose.mongo.ObjectId(users._id)})
        console.log('this.users ' + this.user);
      }));
  }
  getBook(){
    let bookid;
    this.route.params.subscribe(params => {
      bookid = params.id; // --> Name must match wanted parameter
    });
    return this.api.getBook(bookid).pipe(
      map((books) => {
        console.log('users ' + books);
        // this.orderForm.patchValue({'books': books._id})        
      }));    
  }
  onFormSubmit(form:NgForm) {    
    let bookid;
    this.route.params.subscribe(params => {
      bookid = params.id; // --> Name must match wanted parameter
    });
    var data = JSON.parse(localStorage.getItem("currentUser"));
    this.api.postOrder(form,data['_id'],bookid)
      .subscribe(res => {
          // let id = res['_id'];
          // this.router.navigate(['/book-details', id]);
          // this.router.navigate(['/book-details']);
        }, (err) => {
          console.log(err);
        });
  }

}
