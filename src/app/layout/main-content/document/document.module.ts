import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocDetailComponent } from './doc-detail/doc-detail.component';
import {SharedModule} from "../../../shared/shared.module";
import {ContainerModule} from "../../container/container.module";
import {DocActivityTableComponent} from "./doc-activity-table/doc-activity-table.component";
import {DocMmpComponent} from "./doc-mmp/doc-mmp.component";
import {ChemblExplorerModule} from "../../../shared/chembl-explorer/chembl-explorer.module";
import { DocumentListComponent } from './document-list/document-list.component';

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    ChemblExplorerModule,
    DocumentRoutingModule
  ],
  declarations: [
    DocDetailComponent,
    DocActivityTableComponent,
    DocMmpComponent,
    DocumentListComponent,
  ]
})
export class DocumentModule { }
