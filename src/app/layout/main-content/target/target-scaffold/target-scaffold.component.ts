import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-scaffold',
  templateUrl: './target-scaffold.component.html',
  styleUrls: ['./target-scaffold.component.css']
})
export class TargetScaffoldComponent implements OnInit {

  includeParam = '&exclude[]=target.*';
  displayedColumns = [
    'scaffold', 'max', 'mean', 'median', 'min', 'count'
  ];
  restUrl$: Observable<string>;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('scaffold activity table init.');
    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        return `phin/scaffold-activities/?filter{target.tid}=${params.get('tid')}${this.includeParam}`;
      }
    );
  }

}
