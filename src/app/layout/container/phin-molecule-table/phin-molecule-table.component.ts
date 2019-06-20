import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {of as observableOf} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {PageMeta} from '../../models';
import {Router} from '@angular/router';
import {merge} from 'rxjs/observable/merge';
import {GlobalService} from '../../../services/global/global.service';
import {MoleculeDictionaryTooltips} from '../../../phin/molecule-dictionary-tooltips.enum';
import {PhinActivityTooltips} from '../../../phin/phin-activity-tooltips.enum';

@Component({
  selector: 'app-phin-molecule-table',
  templateUrl: './phin-molecule-table.component.html',
  styleUrls: ['./phin-molecule-table.component.css']
})
export class PhinMoleculeTableComponent implements OnInit, AfterViewInit {

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
  allColumns = ['molregno', 'molregno.pref_name', 'molregno.molecule_type', 'molregno.max_phase', 'molregno.chembl',
    // 'phin_id',
    'molregno.withdrawn_flag', 'molregno.dosed_ingredient', 'molregno.usan_stem', 'molregno.withdrawn_reason', 'molregno.parenteral',
    'molregno.chebi_par_id', 'molregno.withdrawn_country', 'molregno.biotherapeutics', 'molregno.first_approval', 'molregno.topical',
    'molregno.prodrug', 'molregno.chirality', 'molregno.usan_substem',  'molregno.polymer_flag', 'molregno.therapeutic_flag',
    'molregno.structure_type', 'molregno.usan_stem_definition', 'molregno.natural_product',
    'molregno.as_child_molecule', 'molregno.black_box_warning', 'molregno.availability_type', 'molregno.inorganic_flag',
    'molregno.withdrawn_year', 'molregno.indication_class', 'molregno.usan_year', 'molregno.first_in_class', 'molregno.oral'
  ];
  includeParams = '';
  tooltipDisabled: boolean;
  moleculeDictionaryTooltips = MoleculeDictionaryTooltips;
  constructor(
    private rest: RestService,
    private router: Router,
    private globalService: GlobalService
  ) { }

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
          return data['molecules'];
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
