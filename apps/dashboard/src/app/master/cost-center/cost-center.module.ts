import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@workshop/material';

import { CostCenterRoutingModule } from './cost-center-routing.module';
import { CostCenterComponent } from './cost-center.component';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';
import { CustomDirectivesModule } from '@workshop/custom-directives';

@NgModule({
  declarations: [CostCenterComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonUiModule,
    ReactiveFormsModule,
    MaterialModule,
    CostCenterRoutingModule,
    CustomDirectivesModule
  ],
  exports: [CostCenterComponent],
  entryComponents: [CostCenterComponent, DeleteComponent, LoaderComponent]
})
export class CostCenterModule {}
