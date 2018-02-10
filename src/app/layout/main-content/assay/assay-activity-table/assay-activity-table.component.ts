import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-assay-activity-table',
  templateUrl: './assay-activity-table.component.html',
  styleUrls: ['./assay-activity-table.component.css']
})

export class AssayActivityTableComponent implements OnInit {
  includeParam = '';
  restUrl$: Observable<string>;
  displayedColumns =  [
    'molregno', 'target_pref_name', 'standard_type',  'pchembl_value',
    'standard_value', 'standard_relation','assay', 'doc',
  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log('assay activity init');
    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        return  `chembl/activities/?filter{assay.assay_id}=${params.get('assayId')}${this.includeParam}`
      }
    );
  }
}
