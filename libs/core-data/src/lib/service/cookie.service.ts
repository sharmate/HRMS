import { Injectable } from '@angular/core'
import { Cookie } from 'ng2-cookies'

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() {}

  setUserName(userName) {
    Cookie.set('username', userName)
  }

  setEmail(email) {
    Cookie.set('email', email)
  }

  setPassWord(password) {
    Cookie.set('password', password)
  }

  getUserName() {
    return Cookie.get('username')
  }

  getEmail() {
    return Cookie.get('email')
  }

  getPassword() {
    return Cookie.get('password')
  }

  deletPassword() {
    Cookie.delete('username')
    Cookie.delete('email')
    Cookie.delete('password')
  }
}
