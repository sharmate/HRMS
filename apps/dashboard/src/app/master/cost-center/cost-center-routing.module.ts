import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostCenterComponent } from './cost-center.component';

const routes: Routes = [{ path: '', component: CostCenterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostCenterRoutingModule {}
