import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-scaffold-network-data-list',
  templateUrl: './target-scaffold-network-data-list.component.html',
  styleUrls: ['./target-scaffold-network-data-list.component.css']
})
export class TargetScaffoldNetworkDataListComponent implements OnInit {

  restUrl$: Observable<string>;
  tableTitle = '';
  displayedColumns = [
    'first_target', 'second_target', 'shared_scaffolds'
  ];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const tid = +(params.get('tid'));
      return `phin/target-scaffold-network/target/?tid=${tid}`;
    });
  }

}
