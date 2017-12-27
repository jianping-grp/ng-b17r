import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssayRoutingModule } from './assay-routing.module';
import { AssayDetailComponent } from './assay-detail/assay-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AssayRoutingModule
  ],
  declarations: [AssayDetailComponent]
})
export class AssayModule { }
