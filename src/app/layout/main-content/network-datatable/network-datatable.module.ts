import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkDatatableRoutingModule } from './network-datatable-routing.module';
import { TargetNetworkDataListComponent } from './target-network-data-list/target-network-data-list.component';
import { TargetScaffoldNetworkDataListComponent } from './target-scaffold-network-data-list/target-scaffold-network-data-list.component';

@NgModule({
  imports: [
    CommonModule,
    NetworkDatatableRoutingModule
  ],
  declarations: [TargetNetworkDataListComponent, TargetScaffoldNetworkDataListComponent]
})
export class NetworkDatatableModule { }
