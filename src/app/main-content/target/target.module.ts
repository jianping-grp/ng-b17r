import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetRoutingModule } from './target-routing.module';
import { TargetActivityTableComponent } from './target-activity-table/target-activity-table.component';
import {TargetDetailComponent} from './target-detail/target-detail.component';
import {TargetListComponent} from './target-list/target-list.component';
import {TargetNetworkComponent} from './target-network/target-network.component';

@NgModule({
  imports: [
    CommonModule,
    TargetRoutingModule
  ],
  declarations: [
    TargetActivityTableComponent,
    TargetDetailComponent,
    TargetListComponent,
    TargetNetworkComponent
  ]
})
export class TargetModule { }
