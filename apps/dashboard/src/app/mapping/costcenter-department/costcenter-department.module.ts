import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@workshop/material';
import { CostcenterDepartmentRoutingModule } from './costcenter-department-routing.module';
import { CostcenterDepartmentComponent } from './costcenter-department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';

@NgModule({
  declarations: [CostcenterDepartmentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    CommonUiModule,
    ReactiveFormsModule,
    CostcenterDepartmentRoutingModule
  ],
  exports: [CostcenterDepartmentComponent],
  entryComponents: [
    CostcenterDepartmentComponent,
    DeleteComponent,
    LoaderComponent
  ]
})
export class CostcenterDepartmentModule {}
