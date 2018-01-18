import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RestService} from '../../../services/rest/rest.service';
import {PageMeta} from '../../models';
import {of} from 'rxjs/observable/of';
import {merge} from 'rxjs/observable/merge';
import {GlobalService} from '../../../services/global/global.service';
import {ActivityListParamType} from '../../../phin/activity-list-param-type.enum';

@Component({
  selector: 'app-scaffold-table',
  templateUrl: './scaffold-table.component.html',
  styleUrls: ['./scaffold-table.component.css']
})
export class ScaffoldTableComponent implements OnInit, AfterViewInit {

  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  tid: string | number;
  @Input() tableTitle = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @Input() custom = true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private globalService: GlobalService,
              private rest: RestService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
  }

  ngAfterViewInit() {
    this.restUrl$.subscribe(data => {
      this.restUrl = data;
      // extract tid
      // todo: use Activate router instead?
      const reg = /tid}=(\d+)/;
      this.tid = reg.exec(this.restUrl)[1];
    });
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    merge(this.sort.sortChange, this.paginator.page, this.restUrl$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.rest.getDataList(
            this.restUrl,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          return data['scaffold_activities'];
        }),
        catchError(() => {
          this.isLoadingError = true;
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe(
        data => this.dataSource.data = data
      );
  }

  goActivities(scaffoldId: number | string) {
    this.globalService.gotoActivityList(ActivityListParamType.mix, {
      tid: this.tid,
      scaffold: scaffoldId
    });
  }
}
