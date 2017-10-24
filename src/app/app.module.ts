import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {KeywordSearchComponent} from './side-panel/keyword-search/keyword-search.component';
import {MoleculeListComponent} from './main-content/molecule/molecule-list/molecule-list.component';
import {MoleculeDetailComponent} from './main-content/molecule/molecule-detail/molecule-detail.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {ActivityListComponent} from './main-content/activity/activity-list/activity-list.component';
import {MolregnoToSmilesPipe} from './pipes/molregno-to-smiles.pipe';
import {SharedModule} from './shared';
import {CoreModule} from './core';

@NgModule({
  declarations: [
    AppComponent,
    KeywordSearchComponent,
    MoleculeListComponent,
    MoleculeDetailComponent,
    ActivityListComponent,
    MolregnoToSmilesPipe,
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
