import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsmeComponent } from './jsme/jsme.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JsmeComponent],
  exports: [JsmeComponent]
})
export class JsmeModule { }
