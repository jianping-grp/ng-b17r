import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CytoscapeComponent } from './cytoscape/cytoscape.component';
import { CytoscapeDirective } from './cytoscape.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CytoscapeComponent,
    CytoscapeDirective
  ],
  declarations: [CytoscapeComponent, CytoscapeDirective]
})
export class CytoscapeModule { }
