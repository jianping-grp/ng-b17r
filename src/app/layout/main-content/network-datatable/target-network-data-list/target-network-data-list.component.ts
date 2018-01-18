import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-target-network-data-list',
  templateUrl: './target-network-data-list.component.html',
  styleUrls: ['./target-network-data-list.component.css']
})
export class TargetNetworkDataListComponent implements OnInit {
  restUrl$: Observable<string>;
  tableTitle = '';
  displayedColumns = [
    'molecule', 'target', 'mean', 'count'
  ];
  extraParam = '&include[]=target.*&include[]=molecule.*';

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
      return `phin/activities/combined_activities/` +
        `?first_target=${firstTarget}&second_target=${secondTarget}&top=${topAct}` +
        `${this.extraParam}`;
    });
  }
}
