import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared';
import {TargetTableComponent} from './target-table/target-table.component';
import {ActivityTableComponent} from './activity-table/activity-table.component';
import { MmpTableComponent } from './mmp-table/mmp-table.component';
import { MoleculeTableComponent } from './molecule-table/molecule-table.component';
import {CustomColumnsDialogComponent} from './custom-columns-dialog/custom-columns-dialog.component';
import { ScaffoldTableComponent } from './scaffold-table/scaffold-table.component';
import { NgEchartsV3Module } from 'ng-echarts-v3/src/ng-echarts/ng-echarts-v3.module';
import { GraphPiePropertyCountComponent } from './graph-pie-property-count/graph-pie-property-count.component';
import { GraphBarPropertyCountComponent } from './graph-bar-property-count/graph-bar-property-count.component';
import { GraphScatterLigandComponent } from './graph-scatter-ligand/graph-scatter-ligand.component';
import { GraphLinePropertyCountComponent } from './graph-line-property-count/graph-line-property-count.component';
import { TargetTargetTableComponent } from './target-target-table/target-target-table.component';
import { TargetTargetScaffoldTableComponent } from './target-target-scaffold-table/target-target-scaffold-table.component';
import {DocTableComponent} from './doc-table/doc-table.component';
import { AssayTypePieChartComponent } from './assay-type-pie-chart/assay-type-pie-chart.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { ActivityTypePieChartComponent } from './activity-type-pie-chart/activity-type-pie-chart.component';
import { DocumentTimeLineChartComponent } from './document-time-line-chart/document-time-line-chart.component';
import { MoleculePropertyBarChartComponent } from './molecule-property-bar-chart/molecule-property-bar-chart.component';
import { LigandEffsScatterChartComponent } from './ligand-effs-scatter-chart/ligand-effs-scatter-chart.component';
import { TargetNetworkTableComponent } from './target-network-table/target-network-table.component';
import { TargetScaffoldNetworkTableComponent } from './target-scaffold-network-table/target-scaffold-network-table.component';
import { MoleculeNetworkTableComponent } from './molecule-network-table/molecule-network-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgEchartsV3Module,
    NgxEchartsModule
  ],
  declarations: [
    ActivityTableComponent,
    TargetTableComponent,
    MmpTableComponent,
    MoleculeTableComponent,
    CustomColumnsDialogComponent,
    ScaffoldTableComponent,
    GraphPiePropertyCountComponent,
    GraphBarPropertyCountComponent,
    GraphScatterLigandComponent,
    GraphLinePropertyCountComponent,
    TargetTargetTableComponent,
    TargetTargetScaffoldTableComponent,
    GraphLinePropertyCountComponent,
    TargetTargetTableComponent,
    TargetTargetScaffoldTableComponent,
    DocTableComponent,
    AssayTypePieChartComponent,
    ActivityTypePieChartComponent,
    DocumentTimeLineChartComponent,
    MoleculePropertyBarChartComponent,
    LigandEffsScatterChartComponent,
    TargetNetworkTableComponent,
    TargetScaffoldNetworkTableComponent,
    MoleculeNetworkTableComponent
  ],
  exports: [
    TargetTableComponent,
    ActivityTableComponent,
    MmpTableComponent,
    MoleculeTableComponent,
    ScaffoldTableComponent,
    GraphPiePropertyCountComponent,
    GraphBarPropertyCountComponent,
    GraphScatterLigandComponent,
    GraphLinePropertyCountComponent,
    TargetTargetTableComponent,
    TargetTargetScaffoldTableComponent,
    GraphLinePropertyCountComponent,
    TargetTargetTableComponent,
    TargetTargetScaffoldTableComponent,
    DocTableComponent,
    AssayTypePieChartComponent,
    ActivityTypePieChartComponent,
    DocumentTimeLineChartComponent,
    MoleculePropertyBarChartComponent,
    LigandEffsScatterChartComponent,
    TargetNetworkTableComponent,
    TargetScaffoldNetworkTableComponent,
    MoleculeNetworkTableComponent
  ],
  entryComponents: [
    CustomColumnsDialogComponent
  ]
})
export class ContainerModule {
}
