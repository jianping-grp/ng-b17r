import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';


import {AppRoutingModule} from './app-routing/app-routing.module';

import {SharedModule} from './shared';
import {CoreModule} from './core';
import {ActivityModule} from './layout/main-content/activity/activity.module';
import {SidePanelModule} from './layout/side-panel/side-panel.module';
import {PageModule} from './layout/main-content/page/page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ActivityModule,
    PageModule,
    SidePanelModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
