import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HelpComponent} from './help/help.component';
import {OverviewComponent} from './overview/overview.component';
import {TargetHelpComponent} from './target-help/target-help.component';
import {MoleculeHelpComponent} from './molecule-help/molecule-help.component';
import {AssayHelpComponent} from './assay-help/assay-help.component';

const routes: Routes = [
  {
    path: '',
    component: HelpComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'target',
        component: TargetHelpComponent
      },
      {
        path: 'molecule',
        component: MoleculeHelpComponent
      },
      {
        path: 'assay',
        component: AssayHelpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {
}
