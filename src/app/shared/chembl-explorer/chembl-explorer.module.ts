import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetCardComponent } from './target-card/target-card.component';
import { DocCardComponent } from './doc-card/doc-card.component';
import {SharedModule} from '../shared.module';
import { CompoundCardComponent } from './compound-card/compound-card.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [TargetCardComponent, DocCardComponent, CompoundCardComponent],
  exports: [DocCardComponent, TargetCardComponent, CompoundCardComponent],
  entryComponents: [DocCardComponent, CompoundCardComponent]
})
export class ChemblExplorerModule { }
