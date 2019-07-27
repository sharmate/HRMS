import { Component, OnInit } from '@angular/core';
import {
  WebService,
  UiService,
  CookieService,
  LocalService
} from '@workshop/core-data';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private web: WebService,
    private ui: UiService,
    private cookie: CookieService,
    private local: LocalService,
    private router: Router
  ) {}
  loginDetails = {
    email: '',
    password: ''
  };
  hide = true;
  forgotEmail = '';
  isForgot = false;
  responseData: any = {};
  responses: any = {};
  vEmail = this.ui.validateEmail;
  vReset = this.ui.validateEmail;
  vPassword = this.ui.validatePassword;
  ngOnInit() {
    if (this.cookie.getEmail() !== '' && this.cookie.getPassword() !== '') {
      this.router.navigateByUrl('');
      this.router.navigateByUrl('/dashboard');
    }
  }
  checkEmail = () => this.ui.getEmailError();
  checkPassword = () => this.ui.getPasswordError();

  login() {
    if (
      this.loginDetails.email === '' ||
      this.loginDetails.email === undefined
    ) {
      this.ui.snackbarPop('Email is required', 'Retry', 'Error');
      return false;
    }

    if (
      this.loginDetails.password === '' ||
      this.loginDetails.password === undefined
    ) {
      this.ui.snackbarPop('Password is required', 'Retry', 'Error');
      return false;
    }
    const request = {
      email: this.loginDetails.email,
      password: this.loginDetails.password
    };
    this.web.post('Login/ajax_login_details', request).subscribe(
      data => {
        if (data.status) {
          this.responseData = data.user;
          localStorage.setItem('user_data', JSON.stringify(this.responseData));
          localStorage.setItem('role', data.role);
          localStorage.setItem('email', this.responseData.email);
          localStorage.setItem('password', btoa(this.responseData.password));
          localStorage.setItem('employee_id', this.responseData.employee_id);
          localStorage.setItem('company_id', this.responseData.company_id);
          window.location.href = '/dashboard';
        } else {
          this.ui.snackbarPop(data.message, 'Retry', 'Error');
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', 'Retry', 'Error');
      }
    );
  }

  forgotPassword() {
    this.isForgot = true;
  }
  sendForgotRequest() {
    const request = {
      email: this.forgotEmail
    };
  }

  backToLogin() {
    this.isForgot = false;
  }
}
