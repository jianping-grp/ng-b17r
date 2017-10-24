import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoleculeListComponent} from '../main-content/molecule/molecule-list/molecule-list.component';
import {MoleculeDetailComponent} from '../main-content/molecule/molecule-detail/molecule-detail.component';
import {ActivityListComponent} from '../main-content/activity/activity-list/activity-list.component';
const routers: Routes = [
  {
    path: '', redirectTo: 'molecule-list', pathMatch: 'full'
  },
  {
    path: 'targets',
    loadChildren: 'app/main-content/target/target.module#TargetModule'
  },
  {
    path: 'molecule-list', component: MoleculeListComponent
  },
  {
    path: 'molecule-detail/:molregno', component: MoleculeDetailComponent
  },
  {
    path: 'activity-list/:tid', component: ActivityListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routers, {enableTracing: false})
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
