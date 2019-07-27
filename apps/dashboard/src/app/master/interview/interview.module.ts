import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@workshop/material'
import { InterviewRoutingModule } from './interview-routing.module'
import { InterviewComponent } from './interview.component'


@NgModule({
  declarations: [InterviewComponent],
  imports: [CommonModule, FormsModule, MaterialModule, InterviewRoutingModule]
})
export class InterviewModule {}
