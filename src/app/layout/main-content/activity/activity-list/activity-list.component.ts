import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  restUrl$: Observable<string>;
  displayedColumns = [
    'molregno', 'target_pref_name', 'standard_type', 'data_validity_comment', 'pchembl_value',
    'standard_value', 'standard_relation', 'uo_units'
  ];
  extraParam = '&exclude[]=molregno.*&exclude[]=molregno.compoundstructures.*' +
    '&include[]=molregno.compoundstructures.canonical_smiles' +
    '&include[]=molregno.compoundstructures.molregno';

  constructor(private route: ActivatedRoute,
              private rest: RestService) {
  }


  ngOnInit() {
    console.log('activity list init');
    this.restUrl$ = this._getRestUrl();

  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map(
      (params: ParamMap) => {
        // the order of params extraction if essential
        // list activities by target id (tid)
        if (params.has('scaffoldId')) {
          const scaffoldId = params.get('scaffoldId');
          const tid = params.get('tid');
          if (tid) {
            return `chembl/activities/?filter{molregno.phin_id.scaffold}=${scaffoldId}`
              + `&filter{assay.tid}=${tid}`
              + `${this.extraParam}`;
          }
        } else if (params.has('tid')) {
          const tid = params.get('tid');
          return `chembl/activities/?filter{assay.tid}=${tid}${this.extraParam}`;
        } else if (params.has('molregno')) {
          const molregno = params.get('molregno');
          return `chembl/activities/?filter{molregno}=${molregno}${this.extraParam}`;
        }
      }
    );
  }
}
