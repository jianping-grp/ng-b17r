import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-target-activity-table',
  templateUrl: './target-activity-table.component.html',
  styleUrls: ['./target-activity-table.component.css']
})
export class TargetActivityTableComponent implements OnInit {
  includeParam = '&exclude[]=molregno.*&exclude[]=molregno.compoundstructures.*' +
    '&include[]=molregno.compoundstructures.canonical_smiles' +
    '&include[]=molregno.compoundstructures.molregno';
  displayedColumns = [
    'molregno', 'target_pref_name', 'standard_type',  'pchembl_value',
    'standard_value', 'standard_relation','assay', 'doc',
  ];
  restUrl$: Observable<string>;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('target activity table init.');
    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        return `chembl/activities/?filter{assay.tid}=${params.get('tid')}${this.includeParam}`;
      }
    );
  }
}
