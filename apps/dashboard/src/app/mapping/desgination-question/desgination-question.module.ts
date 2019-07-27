import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@workshop/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DesginationQuestionRoutingModule } from './desgination-question-routing.module';
import { DesginationQuestionComponent } from './desgination-question.component';
import { CustomDirectivesModule } from '@workshop/custom-directives';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';

@NgModule({
  declarations: [DesginationQuestionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    CommonUiModule,
    ReactiveFormsModule,
    CustomDirectivesModule,
    DesginationQuestionRoutingModule
  ],
  exports: [DesginationQuestionComponent],
  entryComponents: [
    DesginationQuestionComponent,
    DeleteComponent,
    LoaderComponent
  ]
})
export class DesginationQuestionModule {}
