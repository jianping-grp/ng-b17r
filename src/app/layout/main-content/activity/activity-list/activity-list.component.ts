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
    'standard_value', 'standard_relation', 'uo_units'
  ];
  extraParam = '&exclude[]=molregno.*&exclude[]=molregno.compoundstructures.*' +
    '&include[]=molregno.compoundstructures.canonical_smiles' +
    '&include[]=molregno.compoundstructures.molregno';

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
              const tid = +params.get('tid');
              const molregno = +params.get('molregno');
              const scaffold = params.get('scaffold');
              const assay_type = params.get('assay_type');
              const moleculeProperty = params.get('moleculeProperty');
              if (tid) {
                searchParams += `&filter{assay.tid}=${tid}`;
              }
              if (molregno) {
                searchParams += `&filter{molregno}=${molregno}`;
              }
              if (scaffold) {
                searchParams += `&filter{molregno.phin_id.scaffold}=${scaffold}`;
              }
              if (assay_type) {
                searchParams += `&filter{assay.assay_type}=${assay_type}`;
              }
              if (moleculeProperty) {
                searchParams += `&filter{moleculeProperty}=${moleculeProperty}`;
              }
              return `chembl/activities/${searchParams}${this.extraParam}`;

            }
            // moleculeProperty and tid
            case ActivityListParamType.tid_moleculeProperty: {
              const tid = +params.get('tid');
              const moleculeProperty = params.get('moleculeProperty');
              const max_value = +params.get('max_value');
              const min_value = +params.get('min_value');
              return `chembl/activities/?filter{assay.tid}=${tid}`
                + `&filter{molregno.compoundproperties.${moleculeProperty}.gte}=${min_value}`
                + `&filter{molregno.compoundproperties.${moleculeProperty}.lt}=${max_value}`
                + `${this.extraParam}`;
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
