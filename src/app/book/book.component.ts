import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';


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
  dataSource: any;
  // dataSource = new BookDataSource(this.api);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private api: ApiService,private router: Router) { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.api.getBooks()
      .subscribe(res => {
        console.log(res);
        this.books = res;
        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.paginator = this.paginator;
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
  readBook(file)
  {
    var data = JSON.parse(localStorage.getItem("currentUser"));
    if(!data)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      this.router.navigate(['/pdf-viewer/read/'+ file]);
    }
    // /pdf-viewer/read/{{element.file}}
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
