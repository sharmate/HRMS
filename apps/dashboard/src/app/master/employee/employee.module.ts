import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@workshop/material';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { CustomDirectivesModule } from '@workshop/custom-directives';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonUiModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MaterialModule,
    CustomDirectivesModule,
    EmployeeRoutingModule
  ],
  exports: [EmployeeComponent],
  entryComponents: [EmployeeComponent, DeleteComponent, LoaderComponent]
})
export class EmployeeModule {}
