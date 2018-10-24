import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,       
        private router: Router,        
        private apiService:ApiService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        // this.apiService.login(this.f.username.value, this.f.password.value)            
        //     .subscribe(
        //         data => {
        //             console.log(data);
        //             this.router.navigate(['/books']);
        //         },
        //         error => {
        //             console.log(error);
        //             this.error = error;
        //             this.loading = false;
        //         });

                this.apiService.login(this.f.username.value, this.f.password.value)
      .subscribe(res => {          
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
          this.error = err;
            this.loading = false;
        });
    }
}