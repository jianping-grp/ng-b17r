import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoleculeDetailComponent} from './molecule-detail/molecule-detail.component';
import {MoleculeListComponent} from './molecule-list/molecule-list.component';
import {MoleculeActivityComponent} from './molecule-activity/molecule-activity.component';
import {MoleculeGraphComponent} from './molecule-graph/molecule-graph.component';
import {MoleculeMmpComponent} from './molecule-mmp/molecule-mmp.component';
import {MoleculeNetworkDataComponent} from './molecule-network-data/molecule-network-data.component';
import {PhinMoleculeListComponent} from './phin-molecule-list/phin-molecule-list.component';

const routes: Routes = [
  {
    path: '',
    component: MoleculeListComponent
  },
  {
    path: 'phin-molecules',
    component: PhinMoleculeListComponent
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
      },
      {
        path: 'network-datatable',
        component: MoleculeNetworkDataComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculeRoutingModule { }
