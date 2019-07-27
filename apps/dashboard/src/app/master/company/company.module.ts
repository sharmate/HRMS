import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@workshop/material';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';
import { CommonModule } from '@angular/common';
import { CustomDirectivesModule } from '@workshop/custom-directives';

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CustomDirectivesModule
  ],
  exports: [CompanyComponent],
  entryComponents: [CompanyComponent, DeleteComponent, LoaderComponent]
})
export class CompanyModule {}
