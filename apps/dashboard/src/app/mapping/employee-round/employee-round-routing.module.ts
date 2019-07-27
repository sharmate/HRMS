import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EmployeeRoundComponent } from './employee-round.component'

const routes: Routes = [{ path: '', component: EmployeeRoundComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoundRoutingModule {}
