import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityTableContainerComponent} from './activity-table-container/activity-table-container.component';
import {TargetNetworkContainerComponent} from './target-network-container/target-network-container.component';
import {SharedModule} from '../../shared';
import {ActivityTableComponent} from './data-table/activity-table/activity-table.component';
import { TargetTableComponent } from './target-table/target-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ActivityTableComponent,
    ActivityTableContainerComponent,
    TargetNetworkContainerComponent,
    TargetTableComponent,
  ],
  exports: [
    ActivityTableContainerComponent,
    TargetNetworkContainerComponent,
    TargetTableComponent
  ]
})
export class ContainerModule {
}
