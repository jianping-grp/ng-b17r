import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared';
import {TargetTableComponent} from './target-table/target-table.component';
import {ActivityTableComponent} from './activity-table/activity-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ActivityTableComponent,
    TargetTableComponent,
  ],
  exports: [
    TargetTableComponent,
    ActivityTableComponent
  ]
})
export class ContainerModule {
}
