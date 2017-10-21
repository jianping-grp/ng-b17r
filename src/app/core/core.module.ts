import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CytoscapeModule} from '../cytoscape/cytoscape.module';

@NgModule({
  imports: [
    CommonModule,
    CytoscapeModule
  ],
  declarations: [],
  exports: [
    CytoscapeModule
  ]
})
export class CoreModule { }
