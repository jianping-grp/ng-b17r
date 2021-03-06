import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TargetType} from '../../../chembl/models/target-type';
import {PageMeta} from '../../models/page-meta';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {RestService} from '../../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {CustomColumnsDialogComponent} from '../custom-columns-dialog/custom-columns-dialog.component';
import {GlobalService} from '../../../services/global/global.service';
import {ActivityListParamType} from '../../../phin/activity-list-param-type.enum';
import {Tooltips} from '../../../phin/tooltips.enum';
import {TargetDictionaryTooltips} from '../../../phin/target-dictionary-tooltips.enum';

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})
export class TargetTableComponent implements OnInit, AfterViewInit {

  targetTypeList: TargetType[] | null;
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  targetTooltips = TargetDictionaryTooltips;
  @Input() tableTitle = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @Input() custom = true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tooltipDisabled: boolean;
  allColumns = [
    'chembl', 'pref_name',
    'organism', 'target_type', 'accessions', 'assays_count'
  ];


  constructor(private rest: RestService,
              private globalService: GlobalService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
    this.globalService.disableTooltip$.subscribe(
      data => this.tooltipDisabled = data
    );
  }

  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data);
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
      );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CustomColumnsDialogComponent, {
      width: '250px',
      data: {allColumns: this.allColumns}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.displayedColumns = result;
    });
  }


  goActivities(tid: number) {
    // this.router.navigate(['activities'], {queryParams: {tid: tid}});
    this.globalService.gotoActivityList(ActivityListParamType.target_tid, tid);
  }

  target_type_tooltip(target_type: string) {
    return this.targetTypeList.find(el => el.target_type === target_type).target_desc;
  }

}
