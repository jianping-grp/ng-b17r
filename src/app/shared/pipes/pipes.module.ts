import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLinkPipe } from './web-link.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WebLinkPipe],
  exports: [
    WebLinkPipe
  ]
})
export class PipesModule { }
