import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
  // styles: [require('./book.component.css'), 'h1 { font-weight: normal; }']
})
export class BookComponent implements OnInit {
  books: any;
  message:string;
  displayedColumns = ['isbn', 'title', 'author', 'actions','preview','read'];
  dataSource = new BookDataSource(this.api);
  constructor(private api: ApiService,private router: Router) { }

  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        console.log(res);
        this.books = res;
      }, err => {
        console.log(err);
      });
  }
  
  bookSearch(newfield:string) {
    console.log(newfield);
    this.api.searchBooks(newfield)
      .subscribe(res => {
        console.log(res);
        this.books = res;
      }, err => {
        console.log(err);
      });
     this.dataSource=new BookDataSource(this.api,newfield);     
  }

  addBook()
  {
    var data = JSON.parse(localStorage.getItem("currentUser"));
    if(!data)
    {
      this.router.navigate(['/login']);
    }
    else if(data['role']!='admin')
    {
      this.message="You donot have permission to add book ";
    }
    else
    {
      this.router.navigate(['/book-create']);
    }
  }
 

  

}

export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService,private newfield:string="" ) {
    super()
  }

  connect() {
    if(this.newfield!="")
    {
      return this.api.searchBooks(this.newfield);
    }
    else
    {
    return this.api.getBooks();
    }
  }

  disconnect() {

  }
}
