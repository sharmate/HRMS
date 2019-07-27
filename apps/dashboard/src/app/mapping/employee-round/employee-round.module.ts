import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '@workshop/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { EmployeeRoundRoutingModule } from './employee-round-routing.module'
import { EmployeeRoundComponent } from './employee-round.component'

@NgModule({
  declarations: [EmployeeRoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoundRoutingModule
  ]
})
export class EmployeeRoundModule {}
