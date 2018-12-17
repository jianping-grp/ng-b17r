import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from '../../../../services/global/global.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MoleculeListParamType} from '../../../../phin/molecule-list-param-type.enum';
import {PhinMoleculeParamType} from '../../../../phin/phin-molecule-param-type.enum';

@Component({
  selector: 'app-phin-molecule-list',
  templateUrl: './phin-molecule-list.component.html',
  styleUrls: ['./phin-molecule-list.component.css']
})
export class PhinMoleculeListComponent implements OnInit {
  restUrl$: Observable<string>;
  displayedColumns = ['molregno', 'pref_name', 'molecule_type', 'max_phase', 'chembl'];

  constructor(private globalService: GlobalService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.restUrl$ = this._getRestUrl();
  }
  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map(
      (params: ParamMap) => {
        if (params.has('paramsType') && params.has('smiles')) {
          const paramsType = +params.get('paramsType');
          const smiles = params.get('smiles');
          // handle different type of molecule list parameters
          switch (paramsType) {
            case PhinMoleculeParamType.substructure: {
              return `phin/molecules/?smiles=${smiles}&search_type=substructure`;
            }
            case PhinMoleculeParamType.similarity: {
              const similarity = params.get('similarity');
              return `phin/molecules/?smiles=${smiles}&search_type=similarity&similarity=${similarity}`;
            }
          }
        }
      }
    );
  }

}
