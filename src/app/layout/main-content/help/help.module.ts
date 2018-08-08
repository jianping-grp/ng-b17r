import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import {HelpComponent} from './help/help.component';
import {SharedModule} from '../../../shared';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    SharedModule
  ],
  declarations: [HelpComponent]
})
export class HelpModule { }
