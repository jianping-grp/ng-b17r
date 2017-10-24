import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsmeComponent } from './jsme/jsme.component';
import { JsmeDirective } from './jsme.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JsmeComponent, JsmeDirective ],
  exports: [JsmeComponent]
})
export class JsmeModule { }
