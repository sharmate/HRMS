import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InterviewRoundNameComponent } from './interview-round-name.component'

const routes: Routes = [{ path: '', component: InterviewRoundNameComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewRoundNameRoutingModule {}
