import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetCardComponent } from './target-card/target-card.component';
import { DocCardComponent } from './doc-card/doc-card.component';
import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [TargetCardComponent, DocCardComponent],
  exports: [DocCardComponent, TargetCardComponent],
  entryComponents: [DocCardComponent]
})
export class ChemblExplorerModule { }
