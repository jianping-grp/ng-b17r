import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActivityTableComponent} from '../tables/activity-table/activity-table.component';
import {TargetActivityTableComponent} from './target-activity-table/target-activity-table.component';

const routes: Routes = [
  {
    path: 'activity-table',
    component: TargetActivityTableComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetRoutingModule { }
