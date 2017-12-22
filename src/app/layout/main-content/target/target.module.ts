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

@NgModule({
  imports: [
    SharedModule,
    ChemblExplorerModule,
    ContainerModule,
    TargetRoutingModule,
  ],
  declarations: [
    TargetActivityTableComponent,
    TargetDetailComponent,
    TargetListComponent,
    TargetNetworkComponent,
    TargetActivityGraphComponent,
    MmpComponent
  ]
})
export class TargetModule { }
