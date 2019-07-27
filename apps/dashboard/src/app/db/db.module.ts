import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '@workshop/navbar';
import { DbRoutingModule } from './db-routing.module';
import { DbComponent } from './db.component';
import { MaterialModule } from '@workshop/material';
import { CommonUiModule, LoaderComponent } from '@workshop/common-ui';

@NgModule({
  declarations: [DbComponent],
  imports: [
    CommonModule,
    NavbarModule,
    CommonUiModule,
    MaterialModule,
    DbRoutingModule
  ],
  entryComponents: [DbComponent, LoaderComponent]
})
export class DbModule {}
