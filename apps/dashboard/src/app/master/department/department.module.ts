import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@workshop/material';
import { NavbarModule } from '@workshop/navbar';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';

@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    NavbarModule,
    CommonUiModule,
    DepartmentRoutingModule,
    MaterialModule
  ],
  exports: [DepartmentComponent],
  entryComponents: [DepartmentComponent, DeleteComponent, LoaderComponent]
})
export class DepartmentModule {}
