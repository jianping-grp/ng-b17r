import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../models/page-meta';
import {Router} from '@angular/router';
import {RestService} from '../../../services/rest/rest.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {merge} from 'rxjs/observable/merge';
import {Doc} from '../../../chembl/models/doc';

@Component({
  selector: 'app-mmp-table',
  templateUrl: './mmp-table.component.html',
  styleUrls: ['./mmp-table.component.css']
})
export class MmpTableComponent implements OnInit, AfterViewInit {

  docList: Doc[];
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
              private rest: RestService) {
  }

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
          this.docList = data['docs'];
          return data['mmps'];
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

  getDocs(docId: number): Doc {
    return this.docList.find(el => el.doc_id === docId);
  }
  gotoAssay(assayId: number | string): void {
    this.router.navigate(['assays', +(assayId)]);
  }

}
