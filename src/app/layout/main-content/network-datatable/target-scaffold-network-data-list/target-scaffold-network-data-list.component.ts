import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-scaffold-network-data-list',
  templateUrl: './target-scaffold-network-data-list.component.html',
  styleUrls: ['./target-scaffold-network-data-list.component.css']
})
export class TargetScaffoldNetworkDataListComponent implements OnInit {

  restUrl$: Observable<string>;
  tableTitle = '';
  displayedColumns = [
    'scaffold', 'target', 'mean', 'count'
  ];
  extraParam = '&include[]=scaffold.*&include[]=target.*&exclude[]=scaffold.molecule_set';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const firstTarget = +(params.get('first_target'));
      const secondTarget = +(params.get('second_target'));
      const topAct = +(params.get('top'));
      return `phin/scaffold-activities/combined_activities/` +
        `?first_target=${firstTarget}&second_target=${secondTarget}&top=${topAct}` +
        `${this.extraParam}`;
    });
  }

}
