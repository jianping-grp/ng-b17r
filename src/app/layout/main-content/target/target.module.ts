import { NgModule } from '@angular/core';
import { TargetRoutingModule } from './target-routing.module';
import { TargetActivityTableComponent } from './target-activity-table/target-activity-table.component';
import {TargetDetailComponent} from './target-detail/target-detail.component';
import {TargetListComponent} from './target-list/target-list.component';
import { TargetActivityGraphComponent } from './target-activity-graph/target-activity-graph.component';
import { MmpComponent } from './mmp/mmp.component';
import {SharedModule} from '../../../shared';
import {ContainerModule} from '../../container/container.module';
import {ChemblExplorerModule} from '../../../shared/chembl-explorer/chembl-explorer.module';
import { TargetScaffoldComponent } from './target-scaffold/target-scaffold.component';
import { TargetNetworkGraphComponent } from './target-network-graph/target-network-graph.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    SharedModule,
    ChemblExplorerModule,
    ContainerModule,
    TargetRoutingModule,
    NgxEchartsModule
  ],
  declarations: [
    TargetActivityTableComponent,
    TargetDetailComponent,
    TargetListComponent,
    TargetActivityGraphComponent,
    MmpComponent,
    TargetScaffoldComponent,
    TargetNetworkGraphComponent
  ]
})
export class TargetModule { }
