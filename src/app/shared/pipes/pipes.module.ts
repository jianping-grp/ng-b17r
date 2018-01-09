import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLinkPipe } from './web-link.pipe';
import { RmAsteriskPipe } from './rm-asterisk.pipe';
import { MolregnoToSmilesPipe } from './molregno-to-smiles.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WebLinkPipe, RmAsteriskPipe, MolregnoToSmilesPipe],
  exports: [
    WebLinkPipe,
    RmAsteriskPipe,
    MolregnoToSmilesPipe
  ]
})
export class PipesModule { }
