import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';


import {AppRoutingModule} from './app-routing/app-routing.module';

import {SharedModule} from './shared';
import {CoreModule} from './core';
import {SidePanelModule} from './layout/side-panel/side-panel.module';
import {PageModule} from './layout/main-content/page/page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PageModule,
    SidePanelModule,
    AppRoutingModule
  ],
  providers: [
    // {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
