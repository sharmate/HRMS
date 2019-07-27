import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NxModule } from '@nrwl/nx'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Custom Module
import { MaterialModule } from '@workshop/material'
import { LoginModule } from './login/login.module'
import { AppRoutingModule } from './app-routing.module'
import { DbModule } from './db/db.module'

// Component
import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginModule,
    DbModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
