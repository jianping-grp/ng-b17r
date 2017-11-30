import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MoleculeDetailComponent} from './molecule-detail/molecule-detail.component';
import {MoleculeListComponent} from './molecule-list/molecule-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MoleculeDetailComponent,
    MoleculeListComponent
  ]
})
export class MoleculeModule { }
