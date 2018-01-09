import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {RestService} from '../../../services/rest/rest.service';

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

  getKeywordPlaceholder(): string {
    return this.searchTypeList.find(el => el.value === this.selectedType).placeHolder;
  }

  submit() {
    if (this.selectedType === 'target') { // target search
      // todo: submit error handle
      this.router.navigate(['targets'], {queryParams: {keyword: this.keyword}});
    } else if (this.selectedType === 'molecule') { // molecule search
      this.router.navigate(['molecules'], {queryParams: {keyword: this.keyword}});
    }


  }

  ngOnInit() {
  }

}
