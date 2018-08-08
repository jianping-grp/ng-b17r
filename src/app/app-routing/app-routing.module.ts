import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../layout/main-content/page/home/home.component';

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
    loadChildren: 'app/layout/main-content/help/help.module#HelpModule'
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
  },
  {
    path: 'scaffolds',
    loadChildren: 'app/layout/main-content/scaffold/scaffold.module#ScaffoldModule'
  },
  {
    path: 'network-datatable',
    loadChildren: 'app/layout/main-content/network-datatable/network-datatable.module#NetworkDatatableModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routers, {enableTracing: false})
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
