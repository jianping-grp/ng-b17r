import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-scaffold-molecule-list',
  templateUrl: './scaffold-molecule-list.component.html',
  styleUrls: ['./scaffold-molecule-list.component.css']
})
export class ScaffoldMoleculeListComponent implements OnInit {
  includeParam = '&include[]=compoundproperties.&include[]=compoundstructures.canonical_smiles' +
    '&exclude[]=compoundstructures.*';
  displayedColumns = [
    'structure', 'molregno', 'activities_count', 'oral', 'natural_product'
  ];
  restUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        return `chembl/molecule-dictionaries/?filter{phin_id.scaffold}=${params.get('scaffoldId')}` +
          `${this.includeParam}`;
      }
    );
  }

}
