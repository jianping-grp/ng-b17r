import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PhinMolecule} from '../../../phin/models/phin-molecule';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TargetDictionary} from '../../../chembl/models/target-dictionary';
import {merge} from 'rxjs/observable/merge';
import {Router} from '@angular/router';
import {PhinTarget} from '../../../phin/models';
import {RestService} from '../../../services/rest/rest.service';
import {GlobalService} from '../../../services/global/global.service';
import {ActivityListParamType} from '../../../phin/activity-list-param-type.enum';
import {of as observableOf} from 'rxjs/observable/of';
import {PageMeta} from '../../models/page-meta';
import {Observable} from 'rxjs/Observable';
import {Scaffold} from '../../../phin/models/scaffold';

@Component({
  selector: 'app-target-target-scaffold-table',
  templateUrl: './target-target-scaffold-table.component.html',
  styleUrls: ['./target-target-scaffold-table.component.css']
})
export class TargetTargetScaffoldTableComponent implements OnInit, AfterViewInit {

  phinTargetList: PhinTarget[];
  scaffoldList: Scaffold [];
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
    'scaffold', 'target', 'mean', 'max', 'min', 'median', 'count'
  ];


  constructor(private router: Router,
              private rest: RestService,
              private globalService: GlobalService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
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
          this.scaffoldList = data['scaffolds'];
          this.phinTargetList = data['targets']
          return data['scaffold_activities'];
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
  getScaffoldSmiles(scaffoldId): string {
    return this.scaffoldList.find(el => el.scaffold_id === scaffoldId).smiles;
  }
  getTidObj(phinTargetId): TargetDictionary {
    return <TargetDictionary>this.phinTargetList.find(el => el.target_id === phinTargetId).tid;
  }
  gotoActivityDetails(phinTargetId, scaffoldId) {
    this.globalService.gotoActivityList(ActivityListParamType.mix, {
      tid: this.getTidObj(phinTargetId).tid,
      scaffold: scaffoldId
    });
  }

}
