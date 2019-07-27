import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CandidateFormComponent } from './candidate-form.component'

const routes: Routes = [{ path: '', component: CandidateFormComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateFormRoutingModule {}
