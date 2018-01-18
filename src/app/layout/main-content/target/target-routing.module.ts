import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TargetActivityTableComponent} from './target-activity-table/target-activity-table.component';
import {TargetDetailComponent} from './target-detail/target-detail.component';
import {TargetListComponent} from './target-list/target-list.component';
import {TargetActivityGraphComponent} from './target-activity-graph/target-activity-graph.component';
import {TargetNetworkComponent} from './target-network/target-network.component';
import {MmpComponent} from './mmp/mmp.component';
import {TargetScaffoldComponent} from './target-scaffold/target-scaffold.component';
import {TargetNetworkGraphComponent} from './target-network-graph/target-network-graph.component';

const routes: Routes = [
  {
    path: '',
    component: TargetListComponent
  },
  {
    path: ':tid',
    component: TargetDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'activity-table',
        pathMatch: 'full'
      },
      {
        path: 'activity-table',
        component: TargetActivityTableComponent,
      },
      {
        path: 'activity-graph',
        component: TargetActivityGraphComponent
      },
      {
        path: 'target-network',
        component: TargetNetworkGraphComponent
      },
      {
        path: 'mmp',
        component: MmpComponent
      },
      {
        path: 'scaffold',
        component: TargetScaffoldComponent
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetRoutingModule { }
