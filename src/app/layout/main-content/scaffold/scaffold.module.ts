import { NgModule } from '@angular/core';
import { ScaffoldRoutingModule } from './scaffold-routing.module';
import { ScaffoldDetailComponent } from './scaffold-detail/scaffold-detail.component';
import {SharedModule} from '../../../shared';
import {ContainerModule} from '../../container/container.module';
import {ChemblExplorerModule} from '../../../shared/chembl-explorer/chembl-explorer.module';
import { ScaffoldMoleculeListComponent } from './scaffold-molecule-list/scaffold-molecule-list.component';
import { ScaffoldActivityListComponent } from './scaffold-activity-list/scaffold-activity-list.component';

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    ChemblExplorerModule,
    ScaffoldRoutingModule
  ],
  declarations: [ScaffoldDetailComponent, ScaffoldMoleculeListComponent, ScaffoldActivityListComponent]
})
export class ScaffoldModule { }
