import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-assay-mmp',
  templateUrl: './assay-mmp.component.html',
  styleUrls: ['./assay-mmp.component.css']
})

export class AssayMmpComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParam = '&include[]=RHAssay.doc.*&include[]=LHAssay.doc.*' +
    '&include[]=target.*&include[]=RHMol.compoundproperties.*' +
    '&include[]=LHMol.compoundproperties.*&exclude[]=RHMol.*&exclude[]=LHMol.*';
  displayedColumns = [
    'LHMol', 'RHMol', 'transform', 'activity', 'Assay',
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log('assay mmp init');
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      return `phin/mmps/?filter{LHAssay.assay_id}=${params.get('assayId')}` +
        `${this.includeParam}`;
      }
    );

  }
}
