import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const httpPDFOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/pdf'})
};
const apiUrl = "/api/books";
const searchUrl = "/api/books/search";
const storeUrl = "/api/stores";
const userUrl = "/api/users";
const orderUrl = "/api/orders";
const fileUrl = "/api/files";
const orderHistoryUrl = "/api/orders/orderhistory";
@Injectable({providedIn: 'root',})
export class ApiService {

  constructor(private http: HttpClient) { }
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
};
private extractData(res: Response) {
  let body = res;
  return body || { };
}
getBooks(): Observable<any> {
  return this.http.get(apiUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}
getStores(): Observable<any> {
  return this.http.get(storeUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}
searchBooks(text: string): Observable<any> { 
  const url = `${searchUrl}/${text}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),    
    catchError(this.handleError));
}

getBook(id: string): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}
getFile(filename: string): Observable<any> {    
  const url = `${fileUrl}/${filename}`;
   return this.http.get(url,{responseType:'blob'}).pipe(map((response => {
    var urlCreator = window.URL;
    return urlCreator.createObjectURL(response);    
  })),catchError(this.handleError));
}

postBook(data): Observable<any> {
  return this.http.post(apiUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}



postStore(data): Observable<any> {
  return this.http.post(storeUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

postUser(data): Observable<any> {
  return this.http.post(userUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

getUser(id: string): Observable<any> {
  const url = `${userUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

updateBook(id: string, data): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.put(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

deleteBook(id: string): Observable<{}> {
  const url = `${apiUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

login(username: string, password: string):Observable<{}> {
  const url = `${userUrl}/authenticate/${username}/${password}`;
  
  return this.http.post(url,httpOptions)
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
          }

          return user;
      }),catchError(err => {        
        return throwError(err);
    }));
}

postOrder(data, books: string, user: string): Observable<any> {
  const url = `${orderUrl}/${books}/${user}`;
  return this.http.post(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}
getOrder(): Observable<any> {
  return this.http.get(orderUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getUserOrder(id: string): Observable<any> {
  return this.http.get(orderHistoryUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

deleteOrder(id: string): Observable<{}> {
  const url = `${orderUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

}


