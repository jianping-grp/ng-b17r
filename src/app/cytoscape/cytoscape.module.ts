import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CytoscapeComponent } from './cytoscape/cytoscape.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CytoscapeComponent
  ],
  declarations: [CytoscapeComponent]
})
export class CytoscapeModule { }
