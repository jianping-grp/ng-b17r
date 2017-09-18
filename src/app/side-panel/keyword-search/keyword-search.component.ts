import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.css']
})
export class KeywordSearchComponent implements OnInit {
  keyword = '';
  searchTypeList = [
    {value: 'target', viewValue: 'Target', placeHolder: 'target keywords or ChEMBL ID'},
    {value: 'molecule', viewValue: 'Molecule', placeHolder: 'molecule keywords or ChEMBL ID'}
  ];
  selectedType = this.searchTypeList[0].value;
  constructor() { }

  getKeywordPlaceholder(): string{
    return this.searchTypeList.find(el => el.value == this.selectedType).placeHolder
  }

  submit() {
    console.log(`search type: ${this.selectedType}, keyword: ${this.keyword}`)
  }

  ngOnInit() {
  }

}
