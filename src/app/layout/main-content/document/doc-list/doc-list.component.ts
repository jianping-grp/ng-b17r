import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {DocListParamType} from '../../../../phin/doc-list-param-type.enum';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})

export class DocListComponent implements OnInit {
  restUrl$: Observable<string>;
  displayedColumns = ['chembl_id', 'title', 'authors', 'journal', 'pubmed_id', 'doi'];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    // console.log('doc list init');
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map(
      (params: ParamMap) => {
        const paramsType = +params.get('paramsType');
        const docParams = params.get('docParams');
        if (paramsType) {
          // handle different type of target list type
          switch (paramsType) {
          // tid_year
            case DocListParamType.tid_year: {
              const year = +params.get('year');
              const tid = +params.get('tid');
              // console.log('doc-url', `chembl/docs/?filter{assays_set.tid}=${tid}&filter{year}=${year}`);
              return `chembl/docs/?filter{assays_set.tid}=${tid}&filter{year}=${year}`;
            }
            case DocListParamType.molregno_year: {
              const year = +params.get('year');
              const molregno = +params.get('molregno');
              return `chembl/docs/?filter{assays_set.activities_set.molregno}=${molregno}&filter{year}=${year}`;
            }
          }
        }
      }
    );
  }
}
