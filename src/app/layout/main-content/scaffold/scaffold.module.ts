import { NgModule } from '@angular/core';
import { ScaffoldRoutingModule } from './scaffold-routing.module';
import { ScaffoldDetailComponent } from './scaffold-detail/scaffold-detail.component';
import {SharedModule} from '../../../shared';
import {ContainerModule} from '../../container/container.module';
import {ChemblExplorerModule} from '../../../shared/chembl-explorer/chembl-explorer.module';

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    ChemblExplorerModule,
    ScaffoldRoutingModule
  ],
  declarations: [ScaffoldDetailComponent]
})
export class ScaffoldModule { }
