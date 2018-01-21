import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-scaffold-activity-list',
  templateUrl: './scaffold-activity-list.component.html',
  styleUrls: ['./scaffold-activity-list.component.css']
})
export class ScaffoldActivityListComponent implements OnInit {
  displayedColumns = [
    'target', 'mean', 'max', 'min', 'median', 'count'
  ];
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        return `phin/scaffold-activities/?filter{scaffold}=${params.get('scaffoldId')}`;
      }
    );
  }

}
