import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {
  displayedColumns = [
    'chembl', 'pref_name',
    'organism', 'target_type', 'assays_count'];
  extraParam = '&include[]=target_type.*';
  restUrl$: Observable<string>;
  tableTitle = '';

  constructor(private router: Router,
              private rest: RestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('target list init');
    this.restUrl$ = this._getRestUrl();
  } // end of ngOnInit

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map(
      (params: ParamMap) => {
        // retrieve target list by keyword
        if (params.has('keyword')) {
          const keyword = params.get('keyword');
          // create table title
          this.tableTitle = `Targets searched by keyword: "${keyword}"`;
          if (keyword.toUpperCase().startsWith('CHEMBL')) {
            return `chembl/target-dictionaries/?filter{chembl}=${keyword.toUpperCase()}${this.extraParam}`;
          } else {
            return `chembl/target-dictionaries/?filter{pref_name.icontains}=${keyword}${this.extraParam}`;
          }
        }
        if (params.has('proteinClass')) {
          const proteinClassId = params.get('proteinClass');
          this.tableTitle = `All targets in the selected class`
          return `chembl/target-dictionaries/?filter{targetcomponents_set.component.componentclass_set.protein_class}=`
           + `${proteinClassId}${this.extraParam}`;
        }
      }
    );
  }


}
