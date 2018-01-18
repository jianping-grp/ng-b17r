import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
  MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSortModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {JsmeModule} from './jsme/jsme.module';
import {JstreeModule} from './jstree/jstree.module';
import { ChemblModule } from '../chembl/chembl.module';
import { PhinModule } from '../phin/phin.module';
import {PipesModule} from './pipes/pipes.module';
import {DirectivesModule} from './directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JsmeModule,
    JstreeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    DirectivesModule,
    PipesModule,
    ChemblModule,
    PhinModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    JsmeModule,
    JstreeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    DirectivesModule,
    PipesModule,
    ChemblModule
  ],
  declarations: [
  ]
})
export class SharedModule { }
