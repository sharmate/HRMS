import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostcenterDepartmentComponent } from './costcenter-department.component';

const routes: Routes = [{ path: '', component: CostcenterDepartmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostcenterDepartmentRoutingModule {}
