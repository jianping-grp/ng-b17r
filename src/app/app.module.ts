import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';


import {AppRoutingModule} from './app-routing/app-routing.module';

import {SharedModule} from './shared';
import {CoreModule} from './core';
import {SidePanelModule} from './layout/side-panel/side-panel.module';
import {PageModule} from './layout/main-content/page/page.module';
import {APP_BASE_HREF, PlatformLocation} from "@angular/common";

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

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
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
