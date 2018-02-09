import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {HelpComponent} from './help/help.component';
import {SharedModule} from '../../../shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [HomeComponent, HelpComponent],
  exports: [HomeComponent, HelpComponent]
})
export class PageModule {
}
