import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {PhinActivityListParamType} from '../../../../phin/phin-activity-list-param-type.enum';

@Component({
  selector: 'app-phin-activity-list',
  templateUrl: './phin-activity-list.component.html',
  styleUrls: ['./phin-activity-list.component.css']
})
export class PhinActivityListComponent implements OnInit {

  restUrl$: Observable<string>;
  tableTitle = '';
  displayedColumns = [
    'molecule', 'molid', 'target', 'chemblid', 'mean', 'count'
  ];
  extraParam = '&include[]=target.*&include[]=molecule.*';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +(params.get('paramsType'));
      switch (paramsType) {
        case PhinActivityListParamType.target_target: {
          const firstTarget = +(params.get('first_target'));
          const secondTarget = +(params.get('second_target'));
          let topAct = +(params.get('top'));
          if (isNaN(topAct)) {
            topAct = 0; // use zero to show all activities
          }
          return `phin/activities/combined_activities/` +
            `?first_target=${firstTarget}&second_target=${secondTarget}&top=${topAct}` +
            `${this.extraParam}`; // todo: rm extra params
        }
        case PhinActivityListParamType.molecule_molecule: {
          const first_molecule = +(params.get('first_molecule'));
          const second_molecule = +(params.get('second_molecule'));
          return `phin/activities/molecule_combined_activities/` +
            `?first_molecule=${first_molecule}&second_molecule=${second_molecule}` +
            `${this.extraParam}`; // todo: rm extra params
        }
      }
    });
  }

}
