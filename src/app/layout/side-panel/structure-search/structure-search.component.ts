import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {JsmeComponent} from '../../../shared/jsme/jsme/jsme.component';
import {GlobalService} from '../../../services/global/global.service';
import {PhinMoleculeParamType} from '../../../phin/phin-molecule-param-type.enum';

@Component({
  selector: 'app-structure-search',
  templateUrl: './structure-search.component.html',
  styleUrls: ['./structure-search.component.css']
})
export class StructureSearchComponent implements OnInit {
  @ViewChild(JsmeComponent)
  private jsme: JsmeComponent;
  searchTypes = ['structure', 'substructure'];
  structureType = 'molecule';
  searchType = this.searchTypes[0];
  similarity = 0.8;

  constructor(private globalService: GlobalService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(
    //   `Structure search: smiles: ${this.jsme.smiles},`
    //   + `structure type: ${this.structureType} `
    //   + `similarity: ${this.similarity}, search type: ${this.searchType}`
    // );
    if (this.searchType === 'structure') {
      this.globalService.gotoPhinMoleculeList(PhinMoleculeParamType.structure, {
        smiles: this.jsme.smiles,
        similarity: this.similarity
      });
    } else if (this.searchType === 'substructure') {
      this.globalService.gotoPhinMoleculeList(PhinMoleculeParamType.substructure, {
        smiles: this.jsme.smiles
      });
    }

  }

}
