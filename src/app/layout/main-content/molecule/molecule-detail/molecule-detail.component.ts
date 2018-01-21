import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {MoleculeDictionary} from '../../../../chembl/models/molecule-dictionary';
import {PhinMolecule} from '../../../../phin/models/phin-molecule';
import {MoleculeHierarchy} from '../../../../chembl/models/molecule-hierarchy';

@Component({
  selector: 'app-molecule-detail',
  templateUrl: './molecule-detail.component.html',
  styleUrls: ['./molecule-detail.component.css']
})
export class MoleculeDetailComponent implements OnInit {
  includeParam = 'include[]=phin_id.scaffold.*' +
    '&exclude[]=phin_id.scaffold.molecule_set' +
    '&include[]=as_child_molecule.'
  moleculeDictionary: MoleculeDictionary;
  moleculeHierarcy: MoleculeHierarchy;
  phinMolecule: PhinMolecule;
  constructor(private route: ActivatedRoute,
              private rest: RestService) {
  }

  ngOnInit() {
    console.log('target detail init');
    this.route.paramMap.subscribe((params: ParamMap) => {
      const tid = params.get('molregno');
      // fetch target data
      this.rest.getData(`chembl/molecule-dictionaries/${tid}/?${this.includeParam}`)
        .subscribe(
          data => {
            this.moleculeDictionary = data['molecule_dictionary'];
            if (data['molecules'] !== undefined) {
              this.phinMolecule = data['molecules'][0];
            }
            if (data['molecule_hierarchies'] !== undefined) {
              this.moleculeHierarcy = data['molecule_hierarchies'][0];
            }
          }
        );
    });
  }
}
