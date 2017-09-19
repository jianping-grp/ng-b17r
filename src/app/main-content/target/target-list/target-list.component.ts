import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Component , OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap, Params} from '@angular/router'
import {RestService} from '../../../rest/rest.service';
import {TargetDictionary} from '../../../models/target-dictionary';
import {PageMeta} from '../../../models/page-meta';

@Component({
  selector: 'app-target-list' ,
  templateUrl: './target-list.component.html' ,
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {
  targetList: TargetDictionary[] | null;
  pageMeta: PageMeta | null;
  displayedColumns: string[];

  constructor(private router: Router ,
              private rest: RestService,
              private route: ActivatedRoute) {
    this.displayedColumns = ['chembl']
  }

  ngOnInit() {
    console.log('target list init');
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        // retrieve target list by keyword
        if(params.has('keyword')){
          let keyword = params.get('keyword');
          console.log(`retrieve target list by keyword: ${keyword}`);
          this.rest.keywordSearch(keyword, 'target').subscribe(
            data => {
              this.targetList = data['target_dictionaries'];
              this.pageMeta = data['meta'];
            }
          )
        }
        //todo: browse targets list
      }
    )
  } //end of ngOnInit

  pageChange(event) {
    console.log(`page change ${event}`);
  }

}
