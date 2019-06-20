import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {PageMeta} from '../../models/page-meta';
import {merge} from 'rxjs/observable/merge';
import {PhinTarget} from '../../../phin/models';
import {PhinMolecule} from '../../../phin/models/phin-molecule';
import {Observable} from 'rxjs/Observable';
import {TargetDictionary} from '../../../chembl/models/target-dictionary';
import {GlobalService} from '../../../services/global/global.service';
import {ActivityListParamType} from '../../../phin/activity-list-param-type.enum';
import {PhinActivityTooltips} from '../../../phin/phin-activity-tooltips.enum';

@Component({
  selector: 'app-target-target-table',
  templateUrl: './target-target-table.component.html',
  styleUrls: ['./target-target-table.component.css']
})
export class TargetTargetTableComponent implements OnInit, AfterViewInit {

  phinTargetList: PhinTarget[];
  phinMoleculeList: PhinMolecule [];
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  @Input() restUrl$: Observable<string>;
  @Input() tableTitle = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() custom = true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = [
    'molecule', 'molid', 'target', 'chemblid', 'mean', 'max', 'min', 'median', 'count'
  ];
  tooltipDisabled: boolean;
  phinActivitiesTooltip = PhinActivityTooltips;


  constructor(private router: Router,
              private rest: RestService,
              private globalService: GlobalService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
    this.globalService.disableTooltip$.subscribe(
      status => this.tooltipDisabled = status
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
          this.phinMoleculeList = data['molecules'];
          this.phinTargetList = data['targets']
          return data['activities'];
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
  getMolregno(phinMolId) {
    return this.phinMoleculeList.find(el => el.mol_id === phinMolId).molregno;
  }
  getTidObj(phinTargetId): TargetDictionary {
    return <TargetDictionary>this.phinTargetList.find(el => el.target_id === phinTargetId).tid;
  }
  gotoActivityDetails(phinTargetId, phinMoleculeId) {
    this.globalService.gotoActivityList(ActivityListParamType.mix, {
      tid: this.getTidObj(phinTargetId).tid,
      molregno: this.getMolregno(phinMoleculeId)
    });
  }

}
