import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssayRoutingModule } from './assay-routing.module';
import { AssayDetailComponent } from './assay-detail/assay-detail.component';
import {SharedModule} from "../../../shared/shared.module";
import {ContainerModule} from "../../container/container.module";
import {AssayActivityTableComponent} from "./assay-activity-table/assay-activity-table.component";
import {AssayMmpComponent} from "./assay-mmp/assay-mmp.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContainerModule,
    AssayRoutingModule
  ],
  declarations: [
    AssayDetailComponent,
    AssayActivityTableComponent,
    AssayMmpComponent
  ]

})
export class AssayModule { }
