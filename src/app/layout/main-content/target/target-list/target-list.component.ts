import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router'
import {PageMeta} from '../../../models/page-meta';
import {TargetType} from '../../../../chembl/models/target-type';
import {RestService} from '../../../../services/rest/rest.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit, AfterViewInit {
  targetTypeList: TargetType[] | null;
  pageMeta: PageMeta | null;
  displayedColumns = [
    'chembl', 'pref_name',
    'organism', 'uniprot', 'target_type', 'assays_count']
  extraParam = '&include[]=target_type.*';
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
              private rest: RestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('target list init');
    this._getRestUrl();
  } //end of ngOnInit

  ngAfterViewInit(){
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    merge(this.sort.sortChange, this.paginator.page, this.route.queryParamMap)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.rest.getDataList(this.restUrl, this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          this.targetTypeList = data['target_types'];
          return data['target_dictionaries'];
        }),
        catchError(() => {
          this.isLoadingError = true;
          this.isLoading = false;
          return observableOf([]);
        })
      )
      .subscribe(
        data => this.dataSource.data = data
      )
  }

  goTargetDetail(tid: number) {
    this.router.navigate(['targets', +(tid)])
  }

  goActivities(tid: number) {
    this.router.navigate(['activity-list', +(tid)]);
  }

  private _getRestUrl(): void {
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        // retrieve target list by keyword
        if (params.has('keyword')) {
          let keyword = params.get('keyword');
          if(keyword.toUpperCase().startsWith('CHEMBL')){
            this.restUrl = `chembl/target-dictionaries/?filter{chembl}=${keyword.toUpperCase()}${this.extraParam}`;
          }
          else{
            this.restUrl = `chembl/target-dictionaries/?filter{pref_name.icontains}=${keyword}${this.extraParam}`;
          }
        }
      }
    )
  }

  target_type_tooltip(target_type: string) {
    return this.targetTypeList.find(el => el.target_type === target_type).target_desc;
  }

  // pageChange(event) {
  //   this._getTargetList(event.pageIndex, event.pageSize)
  // }

}
