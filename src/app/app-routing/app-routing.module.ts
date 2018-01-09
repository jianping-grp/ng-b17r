import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoleculeListComponent} from '../layout/main-content/molecule/molecule-list/molecule-list.component';
import {MoleculeDetailComponent} from '../layout/main-content/molecule/molecule-detail/molecule-detail.component';
import {ActivityListComponent} from '../layout/main-content/activity/activity-list/activity-list.component';
import {HomeComponent} from '../layout/main-content/page/home/home.component';
import {HelpComponent} from '../layout/main-content/page/help/help.component';

const routers: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'help',
    component: HelpComponent
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
    path: 'assays',
    loadChildren: 'app/layout/main-content/assay/assay.module#AssayModule'
  },
  {
    path: 'molecules',
    loadChildren: 'app/layout/main-content/molecule/molecule.module#MoleculeModule'
  },
  {
    path: 'activities',
    loadChildren: 'app/layout/main-content/activity/activity.module#ActivityModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routers, {enableTracing: false})
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
