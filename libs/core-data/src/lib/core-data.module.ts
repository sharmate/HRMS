import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { WebService } from './service/web.service'
import { UiService } from './service/ui.service'
import { LocalService } from './service/local.service'
import { AuthGuard } from './service/auth.guard'
import { AuthService } from './service/auth.service'
import { CookieService } from './service/cookie.service'

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    WebService,
    CookieService,
    UiService,
    LocalService,
    AuthGuard,
    AuthService
  ]
})
export class CoreDataModule {}
