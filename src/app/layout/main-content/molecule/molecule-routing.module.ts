import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoleculeDetailComponent} from './molecule-detail/molecule-detail.component';
import {MoleculeListComponent} from './molecule-list/molecule-list.component';

const routes: Routes = [
  {
    path: '',
    component: MoleculeListComponent
  },
  {
    path: ':molregno',
    component: MoleculeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculeRoutingModule { }
