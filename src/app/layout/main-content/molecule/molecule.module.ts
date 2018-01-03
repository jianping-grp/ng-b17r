import { NgModule } from '@angular/core';

import { MoleculeRoutingModule } from './molecule-routing.module';
import { MoleculeDetailComponent } from './molecule-detail/molecule-detail.component';
import { MoleculeListComponent } from './molecule-list/molecule-list.component';
import {SharedModule} from '../../../shared';
import {ContainerModule} from '../../container/container.module';
import {ChemblExplorerModule} from '../../../shared/chembl-explorer/chembl-explorer.module';
import { MoleculeActivityComponent } from './molecule-activity/molecule-activity.component';
import { MoleculeGraphComponent } from './molecule-graph/molecule-graph.component';

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    ChemblExplorerModule,
    MoleculeRoutingModule
  ],
  declarations: [MoleculeDetailComponent, MoleculeListComponent, MoleculeActivityComponent, MoleculeGraphComponent]
})
export class MoleculeModule { }
