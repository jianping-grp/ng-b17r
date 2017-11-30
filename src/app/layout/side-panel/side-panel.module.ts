import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeywordSearchComponent} from './keyword-search/keyword-search.component';
import {SharedModule} from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    KeywordSearchComponent
  ],
  exports: [
    KeywordSearchComponent
  ]
})
export class SidePanelModule { }
