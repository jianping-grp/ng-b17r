import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {RestService} from '../services/rest/rest.service';
import {GlobalService} from '../services/global/global.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  providers: [
    RestService,
    GlobalService
  ],
  exports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.')
    }
  }
}
