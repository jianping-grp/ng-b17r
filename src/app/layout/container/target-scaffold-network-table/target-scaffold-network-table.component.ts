import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from '../../models/page-meta';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../../../services/rest/rest.service';
import {PhinTarget} from '../../../phin/models';
import {of as observableOf} from 'rxjs/observable/of';
import {Router} from '@angular/router';
import {TargetDictionary} from '../../../chembl/models/target-dictionary';

@Component({
  selector: 'app-target-scaffold-network-table',
  templateUrl: './target-scaffold-network-table.component.html',
  styleUrls: ['./target-scaffold-network-table.component.css']
})
export class TargetScaffoldNetworkTableComponent implements OnInit, AfterViewInit {
  phinTargetList: PhinTarget[];
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
    'first_target', 'second_target', 'first_target_type',
    'second_target_type', 'first_target_organism',
    'second_target_organism', 'shared_scaffolds'
  ];
  includeParams = '&exclude[]=mean&include[]=first_target.&include[]=second_target.';


  constructor(private router: Router,
              private rest: RestService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
  }

  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data + this.includeParams);
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
          this.phinTargetList = data['targets'];
          return data['target_scaffold_networks'];
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

  getTidObj(phinTargetId): TargetDictionary {
    return <TargetDictionary>this.phinTargetList.find(el => el.target_id === phinTargetId).tid;
  }

  gotoPhinActivities(firstTargetId, secondTargetId) {
    const url = 'network-datatable/phin-scaffold-activities';
    this.router.navigate([url], {
      queryParams: {
        first_target: firstTargetId,
        second_target: secondTargetId,
        top: 0 // use zero to show all activities
      }
    });
  }
}
