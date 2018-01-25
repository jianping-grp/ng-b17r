import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkDatatableRoutingModule } from './network-datatable-routing.module';
import { TargetNetworkDataListComponent } from './target-network-data-list/target-network-data-list.component';
import { TargetScaffoldNetworkDataListComponent } from './target-scaffold-network-data-list/target-scaffold-network-data-list.component';
import {SharedModule} from '../../../shared';
import {ContainerModule} from '../../container/container.module';
import { PhinActivityListComponent } from './phin-activity-list/phin-activity-list.component';
import { PhinScaffoldActivityListComponent } from './phin-scaffold-activity-list/phin-scaffold-activity-list.component';

@NgModule({
  imports: [
    CommonModule,
    NetworkDatatableRoutingModule,
    SharedModule,
    ContainerModule
  ],
  declarations: [TargetNetworkDataListComponent, TargetScaffoldNetworkDataListComponent, PhinActivityListComponent, PhinScaffoldActivityListComponent]
})
export class NetworkDatatableModule { }
