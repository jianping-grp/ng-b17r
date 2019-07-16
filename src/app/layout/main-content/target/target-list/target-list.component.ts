import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {TargetsListParamType} from '../../../../phin/targets-list-param-type.enum';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {
  displayedColumns = [
    'chembl', 'pref_name',
    'organism', 'target_type', 'accessions', 'assays_count'
  ];
  extraParam = '&include[]=target_type.*' +
    '&include[]=targetcomponents_set.component.accession' +
    '&include[]=targetcomponents_set.component.db_source' +
    '&exclude[]=targetcomponents_set.*&exclude[]=targetcomponents_set.component.*&exclude[]=icd_set.*';
  restUrl$: Observable<string>;
  tableTitle = '';

  constructor(private router: Router,
              private rest: RestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.restUrl$ = this._getRestUrl();
  } // end of ngOnInit

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map(
      (params: ParamMap) => {
        if (params.has('targetParams')) {
          const paramsType = +params.get('paramsType');
          const targetParams = params.get('targetParams');
          // handle different type of target list type
          switch (paramsType) {
            // retrieve target list by kegg disease class
            case TargetsListParamType.keggDisease: {
              return `chembl/target-dictionaries/?filter` +
                `{targetcomponents_set.component.componentclass_set.component.keggdisease_set.kegg_class.id}` +
                `=${targetParams}${this.extraParam}`;
            }

            case TargetsListParamType.icdDisease: {
              return `chembl/target-dictionaries/?filter` +
                `{icd_set.id}` +
                `=${targetParams}${this.extraParam}`;
            }
            // protein class id
            case TargetsListParamType.proteinClass:
              return `chembl/target-dictionaries/?filter{targetcomponents_set.component.componentclass_set` +
                `.protein_class}=${targetParams}${this.extraParam}`;
            // target keyword
            case TargetsListParamType.keyword: {
              // create table title
              this.tableTitle = `Targets searched by keyword: "${targetParams}"`;
              if (targetParams.toUpperCase().startsWith('CHEMBL')) {
                return `chembl/target-dictionaries/?filter{chembl}=${targetParams.toUpperCase()}${this.extraParam}`;
              } else {
                const keyword = `.*${targetParams.replace(/-|\s|_/g, '.')}.*`;
                return `chembl/target-dictionaries/?filter{pref_name.iregex}=${keyword}${this.extraParam}`;
              }
            }
          }
        }
      }
    );
  }
}
