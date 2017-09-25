import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap, Params} from '@angular/router'
import {RestService} from '../../../services/rest/rest.service';
import {TargetDictionary} from '../../../models/chembl/target-dictionary';
import {PageMeta} from '../../../models/page-meta';
import {TargetDictionaryDataSource} from '../target-dictionary-data-source';
import {GlobalService} from '../../../services/global/global.service';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {
  targetList: TargetDictionary[] | null;
  targetDictionaryDataSource: TargetDictionaryDataSource;
  pageMeta: PageMeta | null;
  displayedColumns: string[];

  constructor(private router: Router,
              private rest: RestService,
              private route: ActivatedRoute) {
    this.displayedColumns = [
      'chembl', 'pref_name',
      'organism', 'target_type', 'assays_count']
  }

  ngOnInit() {
    console.log('target list init');
    this._getTargetList();
  } //end of ngOnInit


  goTargetDetail(tid: number) {
    this.router.navigate(['target-detail', +(tid)])
  }

  goActivities(tid: number) {
    this.router.navigate(['activity-list', +(tid)]);
  }

  private _getTargetList(page?, perPage?): void {
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        // retrieve target list by keyword
        if (params.has('keyword')) {
          let keyword = params.get('keyword');
          console.log(`retrieve target list by keyword: ${keyword}`);
          this.rest.keywordSearch(keyword, 'target', page, perPage)
            .subscribe(
            data => {
              this.targetList = data['target_dictionaries'];
              this.targetDictionaryDataSource = new TargetDictionaryDataSource(this.targetList);
              this.pageMeta = data['meta'];
            },
            error => {},
            () => {})
        }
        //todo: browse targets list
      }
    )
  }

  pageChange(event) {
    this._getTargetList(event.pageIndex, event.pageSize)
  }

}
