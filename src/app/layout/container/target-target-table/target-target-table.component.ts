import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of';
import {PageMeta} from '../../models/page-meta';
import {merge} from 'rxjs/observable/merge';
import {TargetInteraction} from '../../../phin/models';

@Component({
  selector: 'app-target-target-table',
  templateUrl: './target-target-table.component.html',
  styleUrls: ['./target-target-table.component.css']
})
export class TargetTargetTableComponent implements OnInit, AfterViewInit {

  targetInteractionList: TargetInteraction[];
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
  @Input() custom = true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = [
    'chembl', 'pref_name',
    'organism', 'target_type', 'accessions', 'assays_count', 'species_group_flag'
  ];


  constructor(private router: Router,
              private rest: RestService,
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
          this.targetInteractionList = data['target_types'];
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

}
