import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatExpansionModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {KeywordSearchComponent} from './side-panel/keyword-search/keyword-search.component';
import {MoleculeListComponent} from './main-content/molecule/molecule-list/molecule-list.component';
import {MoleculeDetailComponent} from './main-content/molecule/molecule-detail/molecule-detail.component';
import {TargetListComponent} from './main-content/target/target-list/target-list.component';
import {TargetDetailComponent} from './main-content/target/target-detail/target-detail.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RestService} from './services/rest/rest.service';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {ActivityListComponent} from './main-content/activity/activity-list/activity-list.component';
import {JsmeModule} from './jsme/jsme.module';
import {GlobalService} from './services/global/global.service';
import {JstreeModule} from './jstree/jstree.module';
import { ActivityTableComponent } from './main-content/tables/activity-table/activity-table.component';
import { MolregnoToSmilesPipe } from './pipes/molregno-to-smiles.pipe';

@NgModule({
  declarations: [
    AppComponent,
    KeywordSearchComponent,
    MoleculeListComponent,
    MoleculeDetailComponent,
    TargetListComponent,
    TargetDetailComponent,
    ActivityListComponent,
    ActivityTableComponent,
    MolregnoToSmilesPipe
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    JsmeModule,
    JstreeModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule
  ],
  providers: [RestService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
