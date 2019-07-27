import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DesginationQuestionComponent } from './desgination-question.component'

const routes: Routes = [
  {
    path: '',
    component: DesginationQuestionComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesginationQuestionRoutingModule {}
