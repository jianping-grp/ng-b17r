import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TargetNetworkDataListComponent} from './target-network-data-list/target-network-data-list.component';
import {TargetScaffoldNetworkDataListComponent} from './target-scaffold-network-data-list/target-scaffold-network-data-list.component';

const routes: Routes = [
  {
    path: 'target-target',
    component: TargetNetworkDataListComponent
  },
  {
    path: 'target-target-scaffold',
    component: TargetScaffoldNetworkDataListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkDatatableRoutingModule { }
