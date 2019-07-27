import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@workshop/material';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesComponent } from './candidates.component';
import {
  CommonUiModule,
  DeleteComponent,
  PrintComponent
} from '@workshop/common-ui';

@NgModule({
  declarations: [CandidatesComponent],
  imports: [
    CommonModule,
    FormsModule,
    CandidatesRoutingModule,
    CommonUiModule,
    MaterialModule
  ],
  exports: [CandidatesComponent],
  entryComponents: [CandidatesComponent, DeleteComponent, PrintComponent]
})
export class CandidatesModule {}
