import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-target-network-data-list',
  templateUrl: './target-network-data-list.component.html',
  styleUrls: ['./target-network-data-list.component.css']
})
export class TargetNetworkDataListComponent implements OnInit {
  restUrl$: Observable<string>;
  tableTitle = '';
  displayedColumns = [
    'first_target', 'second_target', 'shared_molecules'
  ];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const tid = +(params.get('tid'));
      return `phin/target-network/target/?tid=${tid}`;
    });
  }
}
