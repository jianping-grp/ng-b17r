import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPageByIdDirective } from './view-page-by-id.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ViewPageByIdDirective],
  exports: [ViewPageByIdDirective]
})
export class DirectivesModule { }
