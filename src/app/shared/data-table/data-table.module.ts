import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityTableComponent } from './activity-table/activity-table.component';
import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ActivityTableComponent
  ],
  declarations: [ActivityTableComponent]
})
export class DataTableModule { }
