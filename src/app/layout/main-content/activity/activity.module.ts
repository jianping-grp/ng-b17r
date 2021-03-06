import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ActivityListComponent} from './activity-list/activity-list.component';
import {ContainerModule} from '../../container/container.module';
import {ChemblExplorerModule} from '../../../shared/chembl-explorer/chembl-explorer.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChemblExplorerModule,
    ContainerModule,
    ActivityRoutingModule
  ],
  declarations: [
    ActivityListComponent
  ]
})
export class ActivityModule { }
