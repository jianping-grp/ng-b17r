import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared';
import {TargetTableComponent} from './target-table/target-table.component';
import {ActivityTableComponent} from './activity-table/activity-table.component';
import { MmpTableComponent } from './mmp-table/mmp-table.component';
import { MoleculeTableComponent } from './molecule-table/molecule-table.component';
import {CustomColumnsDialogComponent} from './custom-columns-dialog/custom-columns-dialog.component';
import { ScaffoldTableComponent } from './scaffold-table/scaffold-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ActivityTableComponent,
    TargetTableComponent,
    MmpTableComponent,
    MoleculeTableComponent,
    CustomColumnsDialogComponent,
    ScaffoldTableComponent
  ],
  exports: [
    TargetTableComponent,
    ActivityTableComponent,
    MmpTableComponent,
    MoleculeTableComponent,
    ScaffoldTableComponent
  ],
  entryComponents: [
    CustomColumnsDialogComponent
  ]
})
export class ContainerModule {
}
