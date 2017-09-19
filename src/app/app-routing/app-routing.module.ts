import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TargetListComponent} from '../main-content/target/target-list/target-list.component';
import {TargetDetailComponent} from '../main-content/target/target-detail/target-detail.component';
import {MoleculeListComponent} from '../main-content/molecule/molecule-list/molecule-list.component';
import {MoleculeDetailComponent} from '../main-content/molecule/molecule-detail/molecule-detail.component';
const routers: Routes = [
  {
    path: '', redirectTo: 'molecule-list', pathMatch: 'full'
  },
  {
    path: 'target-list' , component: TargetListComponent
  },
  {
    path: 'target-detail/:chembl', component: TargetDetailComponent
  },
  {
    path: 'molecule-list', component: MoleculeListComponent
  },
  {
    path: 'molecule-detail/:chembl', component: MoleculeDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routers, {enableTracing: false})
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
