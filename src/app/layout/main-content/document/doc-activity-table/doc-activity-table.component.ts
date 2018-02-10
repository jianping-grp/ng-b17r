import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-doc-activity-table',
  templateUrl: './doc-activity-table.component.html',
  styleUrls: ['./doc-activity-table.component.css']
})

export class DocActivityTableComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParam = '';
  displayedColumns = [
    'molregno', 'target_pref_name', 'standard_type',  'pchembl_value',
    'standard_value', 'standard_relation', 'assay', 'doc',
  ];
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    // console.log('document activity table init');
    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        return `chembl/activities/?filter{assay.doc}=${params.get('docId')}${this.includeParam}`
      }
    );
  }
}
