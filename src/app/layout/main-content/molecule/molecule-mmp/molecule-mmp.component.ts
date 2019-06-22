import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-molecule-mmp',
  templateUrl: './molecule-mmp.component.html',
  styleUrls: ['./molecule-mmp.component.css']
})
export class MoleculeMmpComponent implements OnInit {

  restUrl$: Observable<string>;
  includeParam = '&include[]=RHAssay.doc.*&include[]=LHAssay.doc.*' +
    '&include[]=target.*&include[]=RHMol.compoundproperties.*' +
    '&includeLHMol.compoundproperties.*&exclude[]=RHMol.*&&exclude[]=LHMol.*';
  displayedColumns = [
    'Core', 'transform', 'activity', 'Assay',
  ];
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        return `phin/mmps/molecule/?molregno=${params.get('molregno')}`
          + `${this.includeParam}`;
      }
    );
  }

}
