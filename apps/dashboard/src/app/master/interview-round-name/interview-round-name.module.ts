import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterviewRoundNameRoutingModule } from './interview-round-name-routing.module';
import { InterviewRoundNameComponent } from './interview-round-name.component';
import { MaterialModule } from '@workshop/material';
import {
  CommonUiModule,
  DeleteComponent,
  LoaderComponent
} from '@workshop/common-ui';

@NgModule({
  declarations: [InterviewRoundNameComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonUiModule,
    ReactiveFormsModule,
    InterviewRoundNameRoutingModule,
    MaterialModule
  ],
  exports: [InterviewRoundNameComponent],
  entryComponents: [
    InterviewRoundNameComponent,
    DeleteComponent,
    LoaderComponent
  ]
})
export class InterviewRoundNameModule {}
