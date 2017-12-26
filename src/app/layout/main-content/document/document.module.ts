import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocDetailComponent } from './doc-detail/doc-detail.component';

@NgModule({
  imports: [
    CommonModule,
    DocumentRoutingModule
  ],
  declarations: [DocDetailComponent]
})
export class DocumentModule { }
