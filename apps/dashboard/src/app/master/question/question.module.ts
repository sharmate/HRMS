import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@workshop/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question.component';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';

@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    QuestionRoutingModule
  ],
  exports: [QuestionComponent],
  entryComponents: [QuestionComponent, DeleteComponent, LoaderComponent]
})
export class QuestionModule {}
