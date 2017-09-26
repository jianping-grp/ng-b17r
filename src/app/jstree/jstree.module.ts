import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JstreeComponent } from './jstree/jstree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JstreeComponent],
  exports: [JstreeComponent]
})
export class JstreeModule { }
