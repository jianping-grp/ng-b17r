import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetCardComponent } from './target-card/target-card.component';
import { DocCardComponent } from './doc-card/doc-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TargetCardComponent, DocCardComponent],
  exports: [DocCardComponent, TargetCardComponent],
  entryComponents: [DocCardComponent]
})
export class ChemblExplorerModule { }
