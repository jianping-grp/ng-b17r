import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';


import {AppRoutingModule} from './app-routing/app-routing.module';

import {SharedModule} from './shared';
import {CoreModule} from './core';
import {MoleculeModule} from './layout/main-content/molecule/molecule.module';
import {ActivityModule} from './layout/main-content/activity/activity.module';
import {SidePanelModule} from './layout/side-panel/side-panel.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    MoleculeModule,
    ActivityModule,
    SidePanelModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
