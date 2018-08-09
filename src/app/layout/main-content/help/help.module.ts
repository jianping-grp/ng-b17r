import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import {HelpComponent} from './help/help.component';
import {SharedModule} from '../../../shared';
import { OverviewComponent } from './overview/overview.component';
import { TargetHelpComponent } from './target-help/target-help.component';
import { MoleculeHelpComponent } from './molecule-help/molecule-help.component';
import { AssayHelpComponent } from './assay-help/assay-help.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    SharedModule
  ],
  declarations: [HelpComponent, OverviewComponent, TargetHelpComponent, MoleculeHelpComponent, AssayHelpComponent]
})
export class HelpModule { }
