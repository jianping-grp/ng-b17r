import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLinkPipe } from './web-link.pipe';
import { RmAsteriskPipe } from './rm-asterisk.pipe';
import { MolregnoToSmilesPipe } from './molregno-to-smiles.pipe';
import { ScaffoldIdToSmilesPipe } from './scaffold-id-to-smiles.pipe';
import {AssayToTargetNamePipe} from './assay-to-target-name.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WebLinkPipe,
    RmAsteriskPipe,
    MolregnoToSmilesPipe,
    ScaffoldIdToSmilesPipe,
    AssayToTargetNamePipe],
  exports: [
    WebLinkPipe,
    RmAsteriskPipe,
    MolregnoToSmilesPipe,
    ScaffoldIdToSmilesPipe,
    AssayToTargetNamePipe
  ]
})
export class PipesModule { }
