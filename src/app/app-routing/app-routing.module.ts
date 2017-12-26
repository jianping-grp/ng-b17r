import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoleculeListComponent} from '../layout/main-content/molecule/molecule-list/molecule-list.component';
import {MoleculeDetailComponent} from '../layout/main-content/molecule/molecule-detail/molecule-detail.component';
import {ActivityListComponent} from '../layout/main-content/activity/activity-list/activity-list.component';

const routers: Routes = [
  {
    path: '', redirectTo: 'molecule-list', pathMatch: 'full'
  },
  {
    path: 'targets',
    loadChildren: 'app/layout/main-content/target/target.module#TargetModule'
  },
  {
    path: 'documents',
    loadChildren: 'app/layout/main-content/document/document.module#DocumentModule'
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
