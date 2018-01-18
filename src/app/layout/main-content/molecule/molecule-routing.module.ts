import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoleculeDetailComponent} from './molecule-detail/molecule-detail.component';
import {MoleculeListComponent} from './molecule-list/molecule-list.component';
import {MoleculeActivityComponent} from './molecule-activity/molecule-activity.component';
import {MoleculeGraphComponent} from './molecule-graph/molecule-graph.component';
import {MoleculeMmpComponent} from './molecule-mmp/molecule-mmp.component';

const routes: Routes = [
  {
    path: '',
    component: MoleculeListComponent
  },
  {
    path: ':molregno',
    component: MoleculeDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'molecule-activity',
        pathMatch: 'full'
      },
      {
        path: 'molecule-activity',
        component: MoleculeActivityComponent
      },
      {
        path: 'molecule-graph',
        component: MoleculeGraphComponent
      },
      {
        path: 'mmp',
        component: MoleculeMmpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculeRoutingModule { }
