import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JstreeComponent } from './jstree/jstree.component';
import { JstreeKeggDiseaseComponent } from './jstree-kegg-disease/jstree-kegg-disease.component';
import { JstreeIcdComponent } from './jstree-icd/jstree-icd.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JstreeComponent, JstreeKeggDiseaseComponent, JstreeIcdComponent],
  exports: [JstreeComponent, JstreeKeggDiseaseComponent, JstreeIcdComponent]
})
export class JstreeModule { }
