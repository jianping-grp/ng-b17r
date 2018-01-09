import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScaffoldRoutingModule } from './scaffold-routing.module';
import { ScaffoldDetailComponent } from './scaffold-detail/scaffold-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ScaffoldRoutingModule
  ],
  declarations: [ScaffoldDetailComponent]
})
export class ScaffoldModule { }
