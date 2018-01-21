import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocDetailComponent} from './doc-detail/doc-detail.component';
import {DocActivityTableComponent} from "./doc-activity-table/doc-activity-table.component";
import {DocMmpComponent} from "./doc-mmp/doc-mmp.component";
import {DocListComponent} from "./doc-list/doc-list.component";

const routes: Routes = [
  {
    path: '',
    component: DocListComponent
  },
  {
    path: ':docId',
    component: DocDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'activity-table',
        pathMatch: 'full'
      },
      {
        path: 'activity-table',
        component: DocActivityTableComponent
      },
      {
        path: 'mmp',
        component: DocMmpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
