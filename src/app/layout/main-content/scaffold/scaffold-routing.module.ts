import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScaffoldDetailComponent} from './scaffold-detail/scaffold-detail.component';

const routes: Routes = [
  {
    path: ':scaffoldId',
    component: ScaffoldDetailComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScaffoldRoutingModule { }
