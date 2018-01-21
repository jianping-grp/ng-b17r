import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ActivityListParamType} from '../../../../phin/activity-list-param-type.enum';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  restUrl$: Observable<string>;
  displayedColumns = [
    'molregno', 'target_pref_name', 'standard_type', 'data_validity_comment', 'pchembl_value',
    'standard_value', 'doc'
  ];
  extraParam = '&exclude[]=molregno.*&exclude[]=molregno.compoundstructures.*' +
    '&include[]=molregno.compoundstructures.canonical_smiles' +
    '&include[]=molregno.compoundstructures.molregno&include[]=assay.tid.';

  constructor(private route: ActivatedRoute) {
  }


  ngOnInit() {
    console.log('activity list init');
    this.restUrl$ = this._getRestUrl();

  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map(
      (params: ParamMap) => {
        const paramsType = +params.get('paramsType');
        const activityParams = params.get('activityParams');
        if (paramsType) {
          switch (paramsType) {
            // chembl molregno
            case ActivityListParamType.molecule_molregno:
              return `chembl/activities/?filter{molregno}=${activityParams}${this.extraParam}`;
            // chembl tid
            case ActivityListParamType.target_tid:
              return `chembl/activities/?filter{assay.tid}=${activityParams}${this.extraParam}`;
            // phin scaffold
            case ActivityListParamType.scaffold:
              return `chembl/activities/?filter{molregno.phin_id.scaffold}=${activityParams}`
                + `${this.extraParam}`;
            // mix search type
            case ActivityListParamType.mix: {
              let searchParams = '?';
              const tid = params.get('tid');
              const molregno = params.get('molregno');
              const scaffold = params.get('scaffold');
              if (tid) {
                searchParams += `&filter{assay.tid}=${tid}`;
              }
              if (molregno) {
                searchParams += `&filter{molregno}=${molregno}`;
              }
              if (scaffold) {
                searchParams += `&filter{molregno.phin_hierarchy.parent.phin_id.scaffold}=${scaffold}`;
              }
              return `chembl/activities/${searchParams}${this.extraParam}`;

            }
          }
        }
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
