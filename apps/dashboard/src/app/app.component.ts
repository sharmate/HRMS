import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from '@workshop/core-data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private cookie: CookieService) {}
  isLoggedIn = false
  ngOnInit() {
    this.checkuser()
  }

  handleLogout() {
    this.isLoggedIn = false
    window.localStorage.clear()
    this.router.navigateByUrl('/login')
  }

  checkuser() {
    if (
      localStorage.getItem('email') === '' ||
      localStorage.getItem('email') === undefined ||
      localStorage.getItem('email') === null ||
      localStorage.getItem('password') === '' ||
      localStorage.getItem('password') === undefined ||
      localStorage.getItem('password') === null
    ) {
      this.isLoggedIn = false
      this.router.navigateByUrl('/login')
    } else {
      this.isLoggedIn = true
      // this.router.navigateByUrl('/dashboard')
      // this.router.navigateByUrl('/dashboard')
    }
  }
}
