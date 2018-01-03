import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';
import {MoleculeDictionary} from '../../../../chembl/models/molecule-dictionary';

@Component({
  selector: 'app-molecule-detail',
  templateUrl: './molecule-detail.component.html',
  styleUrls: ['./molecule-detail.component.css']
})
export class MoleculeDetailComponent implements OnInit {
  includeParam = ''
  moleculeDictionary: MoleculeDictionary;
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
          }
        );
    });
  }

}
