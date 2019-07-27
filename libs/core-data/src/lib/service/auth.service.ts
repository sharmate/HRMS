import { Injectable } from '@angular/core'

// import {
//   CanActivate,
//   Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot
// } from '@angular/router'
// import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = { isAdmin: true }
  // constructor(private router: Router) {}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   if (
  //     localStorage.getItem('company_id') == '' ||
  //     localStorage.getItem('company_id') == undefined ||
  //     localStorage.getItem('company_id') == null
  //   ) {
  //     return true
  //   }
  // }
  // checkUser() {
  //   return this.user.isAdmin
  // }
  user = { isAdmin: true }
  checkPermisions() {
    return true
  }

  isLoggedIn() {
    return true
  }
}
