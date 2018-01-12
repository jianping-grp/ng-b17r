import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JstreeComponent } from './jstree/jstree.component';
import { JstreeKeggDiseaseComponent } from './jstree-kegg-disease/jstree-kegg-disease.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JstreeComponent, JstreeKeggDiseaseComponent],
  exports: [JstreeComponent, JstreeKeggDiseaseComponent]
})
export class JstreeModule { }
