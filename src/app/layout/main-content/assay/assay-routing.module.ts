import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssayDetailComponent} from './assay-detail/assay-detail.component';
import {AssayActivityTableComponent} from "./assay-activity-table/assay-activity-table.component";
import {AssayMmpComponent} from "./assay-mmp/assay-mmp.component";

const routes: Routes = [
  {
    path: ':assayId',
    component: AssayDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'activity-table',
        pathMatch:'full'
      },
      {
        path: 'activity-table',
        component: AssayActivityTableComponent
      },
      {
        path: 'mmp',
        component: AssayMmpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssayRoutingModule { }
