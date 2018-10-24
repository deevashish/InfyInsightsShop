import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home/';
// import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: BookComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);