import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@workshop/core-data';
import { LoginComponent } from './login/login.component';
import { DbComponent } from './db/db.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DbComponent
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: './db/db.module#DbModule',
  //   canLoad: [AuthGuard]
  // },
  {
    path: 'master',
    loadChildren: './master/master.module#MasterModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'mapping',
    loadChildren: './mapping/mapping.module#MappingModule',
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
