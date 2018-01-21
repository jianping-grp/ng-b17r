import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScaffoldDetailComponent} from './scaffold-detail/scaffold-detail.component';
import {ScaffoldActivityListComponent} from './scaffold-activity-list/scaffold-activity-list.component';
import {ScaffoldMoleculeListComponent} from './scaffold-molecule-list/scaffold-molecule-list.component';

const routes: Routes = [
  {
    path: ':scaffoldId',
    component: ScaffoldDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'molecules',
        pathMatch: 'full'
      },
      {
        path: 'activities',
        component: ScaffoldActivityListComponent
      },
      {
        path: 'molecules',
        component: ScaffoldMoleculeListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScaffoldRoutingModule { }
