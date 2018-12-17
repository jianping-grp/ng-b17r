import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-mmp',
  templateUrl: './mmp.component.html',
  styleUrls: ['./mmp.component.css']
})
export class MmpComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParam = '&include[]=RHAssay.doc.*&include[]=LHAssay.doc.*' +
    '&include[]=target.*&include[]=RHMol.compoundproperties.*' +
    '&include[]=LHMol.compoundproperties.*&exclude[]=RHMol.*&exclude[]=LHMol.*';
  displayedColumns = [
    'LHMol', 'RHMol', 'transform', 'activity', 'Assay',
  ];
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        return `phin/mmps/?filter{target.tid}=${params.get('tid')}`
        + `${this.includeParam}`;
      }
    );
  }

}
