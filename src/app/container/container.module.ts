import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityTableContainerComponent } from './activity-table-container/activity-table-container.component';
import {SharedModule} from '../shared/shared.module';
import { TargetNetworkContainerComponent } from './target-network-container/target-network-container.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ActivityTableContainerComponent, TargetNetworkContainerComponent],
  exports: [
    ActivityTableContainerComponent,
    TargetNetworkContainerComponent
  ]
})
export class ContainerModule { }
