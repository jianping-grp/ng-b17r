import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssayDetailComponent} from './assay-detail/assay-detail.component';

const routes: Routes = [
  {
    path: ':assayId',
    component: AssayDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssayRoutingModule { }
