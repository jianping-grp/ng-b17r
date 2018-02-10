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
import {PhinTarget} from '../../../phin/models';
import {TargetDictionary} from '../../../chembl/models/target-dictionary';
import {ScaffoldTooltips} from '../../../phin/scaffold-tooltips.enum';

@Component({
  selector: 'app-scaffold-table',
  templateUrl: './scaffold-table.component.html',
  styleUrls: ['./scaffold-table.component.css']
})
export class ScaffoldTableComponent implements OnInit, AfterViewInit {

  phinTargetList: PhinTarget[];
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  @Input() tableTitle = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @Input() includeParam = '&include[]=target.*';
  @Input() custom = true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['scaffold', 'target', 'max', 'mean', 'median', 'min', 'count'];
  tooltipDisabled: boolean;
  scaffoldTooltips = ScaffoldTooltips;

  constructor(private globalService: GlobalService,
              private rest: RestService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
    this.globalService.disableTooltip$.subscribe(
      status => this.tooltipDisabled = status
    );
  }

  ngAfterViewInit() {
    this.restUrl$.subscribe(data => {
      this.restUrl = data;
      // extract tid
      // const reg = /tid}=(\d+)/;
      // this.tid = reg.exec(this.restUrl)[1];
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
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
            this.includeParam
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          this.phinTargetList = data['targets'];
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

  getTargetDictionary(phinTargetId): TargetDictionary {
    if (this.phinTargetList !== undefined) {
      return <TargetDictionary>this.phinTargetList.find(el => el.target_id === phinTargetId).tid;
    }
    return;
  }

  goActivities(scaffoldId: number | string, phinTargetId: number) {
    this.globalService.gotoActivityList(ActivityListParamType.mix, {
      tid: this.getTargetDictionary(phinTargetId).tid,
      scaffold: scaffoldId
    });
  }
}
