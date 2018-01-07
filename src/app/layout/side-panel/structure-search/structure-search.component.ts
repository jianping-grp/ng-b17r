import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {JsmeComponent} from '../../../shared/jsme/jsme/jsme.component';

@Component({
  selector: 'app-structure-search',
  templateUrl: './structure-search.component.html',
  styleUrls: ['./structure-search.component.css']
})
export class StructureSearchComponent implements OnInit {
  @ViewChild(JsmeComponent)
    private jsme: JsmeComponent;
  searchTypes = [
    'Structure',
    'Substructure',
    'Scaffold'
  ];
  searchType = this.searchTypes[0];
  similarity = 0.8;
  smiles: string;
  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(
      `Structure search: smiles: ${this.jsme.smiles}, similarity: ${this.similarity}, search type: ${this.searchType}`
    );
  }

}
