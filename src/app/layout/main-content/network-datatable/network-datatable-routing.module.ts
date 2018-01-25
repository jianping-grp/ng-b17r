import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TargetNetworkDataListComponent} from './target-network-data-list/target-network-data-list.component';
import {TargetScaffoldNetworkDataListComponent} from './target-scaffold-network-data-list/target-scaffold-network-data-list.component';
import {PhinActivityListComponent} from './phin-activity-list/phin-activity-list.component';
import {PhinScaffoldActivityListComponent} from './phin-scaffold-activity-list/phin-scaffold-activity-list.component';

const routes: Routes = [
  {
    path: 'target-network-data',
    component: TargetNetworkDataListComponent
  },
  {
    path: 'target-scaffold-network-data',
    component: TargetScaffoldNetworkDataListComponent
  },
  {
    path: 'phin-activities',
    component: PhinActivityListComponent
  },
  {
    path: 'phin-scaffold-activities',
    component: PhinScaffoldActivityListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkDatatableRoutingModule { }
