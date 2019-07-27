import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@workshop/material';

import { CandidateFormRoutingModule } from './candidate-form-routing.module';
import { CandidateFormComponent } from './candidate-form.component';
import { CustomDirectivesModule } from '@workshop/custom-directives';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';

@NgModule({
  declarations: [CandidateFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonUiModule,
    MaterialModule,
    CustomDirectivesModule,
    CandidateFormRoutingModule
  ],
  exports: [CandidateFormComponent],
  entryComponents: [DeleteComponent]
})
export class CandidateFormModule {}
