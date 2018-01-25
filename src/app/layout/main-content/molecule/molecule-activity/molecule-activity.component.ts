import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-molecule-activity',
  templateUrl: './molecule-activity.component.html',
  styleUrls: ['./molecule-activity.component.css']
})
export class MoleculeActivityComponent implements OnInit {
  // includeParam = '&exclude[]=molregno.*&exclude[]=molregno.compoundstructures.*' +
  //   '&include[]=molregno.compoundstructures.canonical_smiles' +
  //   '&include[]=molregno.compoundstructures.molregno';
  displayedColumns = [
    'target_pref_name', 'standard_type', 'pchembl_value', 'standard_relation',
    'standard_value', 'assay', 'doc',
  ];
  restUrl$: Observable<string>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.restUrl$ = this.route.parent.paramMap.map(
      (params: ParamMap) => {
        const molregno = params.get('molregno');
        console.log('molregno:', params.get('molregno'));
        return `chembl/activities/?filter{molregno}=${molregno}`;
      }
    );


  }


}
