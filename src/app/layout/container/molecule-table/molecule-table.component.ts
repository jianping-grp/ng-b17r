import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from '../../models';
import {Observable} from 'rxjs/Observable';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-molecule-table',
  templateUrl: './molecule-table.component.html',
  styleUrls: ['./molecule-table.component.css']
})
export class MoleculeTableComponent implements OnInit, AfterViewInit {

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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['molregno', 'pref_name', 'molecule_type', 'max_phase', 'activities_count', 'chembl',
    //'phin_id',
    'withdrawn_flag', 'dosed_ingredient', 'usan_stem', 'withdrawn_reason', 'parenteral',
    'chebi_par_id', 'withdrawn_country', 'biotherapeutics', 'first_approval', 'topical', 'prodrug',
     'chirality', 'usan_substem',  'polymer_flag', 'therapeutic_flag',
    'structure_type', 'usan_stem_definition', 'natural_product',
     'as_child_molecule','black_box_warning', 'availability_type', 'compoundproperties', 'inorganic_flag',
     'withdrawn_year', 'indication_class', 'usan_year', 'first_in_class', 'oral'
  ];

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

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
          return data['molecule_dictionaries'];
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
  goActivities(molregno: number) {
    this.router.navigate(['activities'], {queryParams: {molregno: molregno}});
  }

}
