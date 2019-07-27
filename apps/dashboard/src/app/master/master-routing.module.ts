import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'employee_list',
    loadChildren: './employee/employee.module#EmployeeModule'
  },
  {
    path: 'department',
    loadChildren: './department/department.module#DepartmentModule'
  },
  {
    path: 'designation',
    loadChildren: './designation/designation.module#DesignationModule'
  },
  {
    path: 'candidates',
    loadChildren: './candidates/candidates.module#CandidatesModule'
  },
  {
    path: 'candidate_form',
    loadChildren: './candidate-form/candidate-form.module#CandidateFormModule'
  },
  {
    path: 'interview_round',
    loadChildren: './interview/interview.module#InterviewModule'
  },
  {
    path: 'document',
    loadChildren: './document/document.module#DocumentModule'
  },
  {
    path: 'interview_round_name',
    loadChildren:
      './interview-round-name/interview-round-name.module#InterviewRoundNameModule'
  },
  {
    path: 'question',
    loadChildren: './question/question.module#QuestionModule'
  },
  {
    path: 'company',
    loadChildren: './company/company.module#CompanyModule'
  },
  {
    path: 'cost-center',
    loadChildren: './cost-center/cost-center.module#CostCenterModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
