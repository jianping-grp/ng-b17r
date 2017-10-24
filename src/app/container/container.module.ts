import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityTableContainerComponent } from './activity-table-container/activity-table-container.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ActivityTableContainerComponent],
  exports: [
    ActivityTableContainerComponent
  ]
})
export class ContainerModule { }
