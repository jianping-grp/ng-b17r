import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-activity-table',
  templateUrl: './target-activity-table.component.html',
  styleUrls: ['./target-activity-table.component.css']
})
export class TargetActivityTableComponent implements OnInit {
  includeParam = '&exclude[]=molregno.*&exclude[]=molregno.compoundstructures.*&include[]=molregno.compoundstructures.canonical_smiles&include[]=molregno.compoundstructures.molregno'
  @Input() restUrl = '';
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('target activity table init.')
    this.route.parent.paramMap.subscribe(
      (params: ParamMap) => {
        let tid = params.get('tid');
        this.restUrl = `chembl/activities/?filter{assay.tid}=${tid}${this.includeParam}`
      }
    )
  }
}
