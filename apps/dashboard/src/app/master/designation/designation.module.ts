import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@workshop/material';
import { DesignationRoutingModule } from './designation-routing.module';
import { DesignationComponent } from './designation.component';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';

@NgModule({
  declarations: [DesignationComponent],
  imports: [
    CommonModule,
    FormsModule,
    DesignationRoutingModule,
    CommonUiModule,
    MaterialModule
  ],
  exports: [DesignationComponent],
  entryComponents: [DesignationComponent, DeleteComponent, LoaderComponent]
})
export class DesignationModule {}
