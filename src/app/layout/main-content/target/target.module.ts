import { NgModule } from '@angular/core';
import { TargetRoutingModule } from './target-routing.module';
import { TargetActivityTableComponent } from './target-activity-table/target-activity-table.component';
import {TargetDetailComponent} from './target-detail/target-detail.component';
import {TargetListComponent} from './target-list/target-list.component';
import {TargetNetworkComponent} from './target-network/target-network.component';
import { TargetActivityGraphComponent } from './target-activity-graph/target-activity-graph.component';
import { MmpComponent } from './mmp/mmp.component';
import {SharedModule} from '../../../shared';
import {ContainerModule} from '../../container/container.module';
import {ChemblExplorerModule} from '../../../shared/chembl-explorer/chembl-explorer.module';
import { TargetScaffoldComponent } from './target-scaffold/target-scaffold.component';
import { NgEchartsV3Module } from 'ng-echarts-v3/src/ng-echarts/ng-echarts-v3.module'

@NgModule({
  imports: [
    SharedModule,
    ChemblExplorerModule,
    ContainerModule,
    NgEchartsV3Module,
    TargetRoutingModule,
  ],
  declarations: [
    TargetActivityTableComponent,
    TargetDetailComponent,
    TargetListComponent,
    TargetNetworkComponent,
    TargetActivityGraphComponent,
    MmpComponent,
    TargetScaffoldComponent
  ]
})
export class TargetModule { }
