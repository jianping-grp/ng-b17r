import { Component, OnInit } from '@angular/core';
import {RestService} from '../../rest/rest.service';
import {Router} from '@angular/router'

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
  constructor(private rest: RestService, private router: Router) { }

  getKeywordPlaceholder(): string{
    return this.searchTypeList.find(el => el.value == this.selectedType).placeHolder
  }

  submit() {
    //console.log(`search type: ${this.selectedType}, keyword: ${this.keyword}`);
    //redirect to target list
    if (this.selectedType === 'target'){
      this.router.navigate(['target-list'], {queryParams: {keyword: this.keyword}})
      //this.router.navigate(['target-list', {keyword: this.keyword}], {})
    }
    // this.rest.keywordSearch(this.keyword, this.selectedType).subscribe(
    //   data => {
    //     console.log(data);
    //   }

  }

  ngOnInit() {
  }

}
