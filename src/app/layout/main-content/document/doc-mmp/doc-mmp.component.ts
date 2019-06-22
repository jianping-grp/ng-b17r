import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-doc-mmp',
  templateUrl: './doc-mmp.component.html',
  styleUrls: ['./doc-mmp.component.css']
})

export class DocMmpComponent implements OnInit {

  restUrl$: Observable<string>;
  includeParam = '&include[]=RHAssay.doc.*&include[]=LHAssay.doc.*';
  displayedColumns = [
    'Core', 'transform', 'activity', 'Assay',
  ];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // console.log('doc mmp init');
    this.restUrl$ = this.route.parent.paramMap.map((params: ParamMap) => {
      return `phin/mmps/?filter{LHAssay.doc}=${params.get('docId')}` +
        `${this.includeParam}`;
    });
  }
}
