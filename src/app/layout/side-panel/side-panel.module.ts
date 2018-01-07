import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeywordSearchComponent} from './keyword-search/keyword-search.component';
import {SharedModule} from '../../shared';
import { StructureSearchComponent } from './structure-search/structure-search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    KeywordSearchComponent,
    StructureSearchComponent
  ],
  exports: [
    KeywordSearchComponent,
    StructureSearchComponent
  ]
})
export class SidePanelModule { }
