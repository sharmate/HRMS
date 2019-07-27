import { Component, OnInit } from '@angular/core'
import {
  WebService,
  UiService,
  CookieService,
  LocalService
} from '@workshop/core-data'
import { Router } from '@angular/router'
import { FormControl, Validators } from '@angular/forms'

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
  }
  forgotEmail = ''
  isForgot = false
  responseData: any = {}
  responses: any = {}
  vEmail = this.ui.validateEmail
  vReset = this.ui.validateEmail
  vPassword = this.ui.validatePassword
  ngOnInit() {
    if (this.cookie.getEmail() !== '' && this.cookie.getPassword() !== '') {
      this.router.navigateByUrl('/db')
    }
  }
  checkEmail = () => this.ui.getEmailError()
  checkPassword = () => this.ui.getPasswordError()

  login() {
    if (
      this.loginDetails.email === '' ||
      this.loginDetails.email === undefined
    ) {
      this.ui.snackbarPop('Email is required', 'Retry', 'Error')
      return false
    }

    if (
      this.loginDetails.password === '' ||
      this.loginDetails.password === undefined
    ) {
      this.ui.snackbarPop('Password is required', 'Retry', 'Error')
      return false
    }
    const request = {
      email: this.loginDetails.email,
      password: this.loginDetails.password
    }
    this.web.post('Login/ajax_login_details', request).subscribe(
      data => {
        let j
        if (data.status) {
          for (let i = 0; i < data.response.length; i++) {
            this.responseData = localStorage.setItem(
              'user_data',
              JSON.stringify(data.response[i])
            )
          }
          const x = this.local.getUserDetails()
          this.cookie.setEmail(x.email)
          this.cookie.setPassWord(btoa(x.password))
          this.cookie.setUserName(`${x.firstName} ${x.lastName}`)
          this.ui.snackbarPop('Succesfully Logged In', '', 'Success')
          this.router.navigateByUrl('/db')
        }
      },
      error => {}
    )
  }

  forgotPassword() {
    this.isForgot = true
  }
  sendForgotRequest() {
    const request = {
      email: this.forgotEmail
    }
  }

  backToLogin() {
    this.isForgot = false
  }
}
