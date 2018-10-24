import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap, map ,catchError, mapTo, subscribeOn} from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
// var pdfSrc: String;
export class PdfViewerComponent implements OnInit {
  pdfSrc;
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  enddate: string;
  message:string;
  pageMessage:string;
  _seconds: number;
  _minutes: number;
  _diff: number;
  constructor(private api: ApiService,private router: Router,private route: ActivatedRoute) { }
  
  ngOnInit() {
    let filename;
    this.route.params.subscribe(params => {
    filename = params.file; // --> Name must match wanted parameter
  });
    if (this.router.url === '/pdf-viewer/read/'+filename)
    {      
      this.pageMessage="Read the entire book";
      var twoMinutesLater = new Date();
      twoMinutesLater.setMinutes(twoMinutesLater.getMinutes() + 1);  
      this.enddate=twoMinutesLater.toString();
      
      interval(1000).pipe(
        map((x) => {
          this._diff = Date.parse(this.enddate) - Date.parse(new Date().toString());          
        })).subscribe((x) => {         
          this._minutes = this.getMinutes(this._diff);
          this._seconds = this.getSeconds(this._diff);
          this.message="You have " + this._minutes + " minute and " + this._seconds + " seconds to read this book. You'll Be redirected to Home Page after that."
          if(this._diff==0)
          {
            this.router.navigate(['/books']);
          }
        });
    } 
    else
    {
      this.pageMessage="Preview the first page of the book";
    }   
    var fileURL:string;
    this.api.getFile(filename)
      .subscribe(res => {       
        this.pdfSrc=res;
      }, err => {
        console.log(err);
      });    
  }
  afterLoadComplete(pdfData: any) {    
    let filename;
    this.route.params.subscribe(params => {
      filename = params.file; // --> Name must match wanted parameter
    });
    if (this.router.url === '/pdf-viewer/read/'+filename)
    {      
      this.totalPages = pdfData.numPages;
         }
    else
    {
      this.totalPages = 1;
    }
    
    this.isLoaded = true;
  }
  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }
}
