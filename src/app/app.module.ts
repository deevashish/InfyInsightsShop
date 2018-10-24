import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {mongoose} from 'mongoose';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { BookComponent } from './book/book.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { StoreComponent } from './store/store.component';
import { OrderComponent } from './order/order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { RouterModule, Routes } from '@angular/router';
import { routing }        from './app.routing';
import { MasterComponent } from './master/master.component';
import { MasterModule } from './master.module';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor} from './_helpers/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,   
  MatToolbarModule, 
  MatFormFieldModule } from "@angular/material";




  const googleMapsCore = AgmCoreModule.forRoot({
    apiKey : 'AIzaSyC9PU_qKLu9T9fxronnzyZii685oiuFLF8',
    libraries: ["places"]
  });

const appRoutes: Routes = [
  {
    path: 'login',
    component: MasterComponent,
    data: { title: 'Log In InfyIndightShop' },
    children: [
      {
        outlet: 'master',
        path: '',
        component: LoginComponent
      }
    ]
  },  
  {
    path: 'books',
    component: MasterComponent,
    data: { title: 'Book List' },
    children: [
      {
        outlet: 'master',
        path: '',
        component: BookComponent
      }
    ]
  },
  {
    path: 'store',
    component: MasterComponent,
    data: { title: 'Stores' },
    children: [
      {
        outlet: 'master',
        path: '',
        component: StoreComponent
      }
    ]
  },  
  {
    path: 'book-details/:id',
    component: MasterComponent,
    data: { title: 'Book Details' },
    children: [
      {
        outlet: 'master',
        path: '',
        component: BookDetailComponent
      }
    ]
  },
  {
    path: 'book-create',
    component: MasterComponent,
    data: { title: 'Create Book' },
    children: [
      {
        outlet: 'master',
        path: '',
        component: BookCreateComponent
      }
    ]
  },
  {
    path: 'book-edit/:id',
    component: MasterComponent,
    data: { title: 'Edit Book' },
    children: [
      {
        outlet: 'master',
        path: '',
        component: BookEditComponent
      }
    ]
  },
  {
    path: 'pdf-viewer/read/:file',
    component: MasterComponent,
    data: { title: 'Preview' },
    children: [
      {
        outlet: 'master',
        path: '',
        component: PdfViewerComponent
      }
    ]
  },
  {
    path: 'pdf-viewer/preview/:file',
    component: MasterComponent,
    data: { title: 'Preview' },
    children: [
      {
        outlet: 'master',
        path: '',
        component: PdfViewerComponent
      }
    ]
  },
  {
    path: 'order/:id',
    component: MasterComponent,
    data: { title: 'Order Details' },
    children: [
      {
        outlet: 'master',
        path: '',
        component: OrderComponent
      }
    ]
  },
  { path: '',
    // redirectTo: '/books',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookCreateComponent,
    BookDetailComponent,    
    LoginComponent,
    BookEditComponent,
    StoreComponent,
    FileSelectDirective,
    OrderComponent,
    OrderHistoryComponent,
    PdfViewerComponent,
    MasterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    MasterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,    
    MatFormFieldModule,
    MatToolbarModule,
    routing,
    googleMapsCore,
    PdfViewerModule
    // mongoose    
    
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
