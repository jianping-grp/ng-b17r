import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-molecule-network-data',
  templateUrl: './molecule-network-data.component.html',
  styleUrls: ['./molecule-network-data.component.css']
})
export class MoleculeNetworkDataComponent implements OnInit {
  restUrl$: Observable<string>;
  displayedColumns = [
    'first_molecule', 'second_molecule', 'shared_targets'
  ];
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        const molregno = params.get('molregno');
        return `phin/molecule-network/molecule/?molregno=${molregno}`;
      }
    );
  }

}
