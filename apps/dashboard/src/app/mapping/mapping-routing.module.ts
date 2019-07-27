import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'designation_question_mapping',
    loadChildren:
      './desgination-question/desgination-question.module#DesginationQuestionModule'
  },
  // {
  //   path: 'employee_round_mapping',
  //   loadChildren: './employee-round/employee-round.module#EmployeeRoundModule'
  // },
  {
    path: 'costcenter_department_mapping',
    loadChildren:
      './costcenter-department/costcenter-department.module#CostcenterDepartmentModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRoutingModule {}
