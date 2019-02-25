import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from '../../models';
import {Observable} from 'rxjs/Observable';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {ActivityListParamType} from '../../../phin/activity-list-param-type.enum';
import {GlobalService} from '../../../services/global/global.service';
import {MoleculeDictionaryTooltips} from '../../../phin/molecule-dictionary-tooltips.enum';
import { JsmeStructureSize } from '../../../phin/jsme-structure-size';

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
  structureSize: JsmeStructureSize;
  @Input() tableTitle = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @Input() includeParams = '&exclude[]=compoundstructures.*&include[]=compoundstructures.canonical_smiles';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['structure', 'molregno', 'pref_name', 'molecule_type', 'max_phase', 'activities_count', 'chembl',
    'withdrawn_flag', 'dosed_ingredient', 'usan_stem', 'withdrawn_reason', 'parenteral',
    'withdrawn_country', 'biotherapeutics', 'first_approval', 'topical', 'prodrug',
    'chirality', 'usan_substem', 'polymer_flag', 'therapeutic_flag',
    'structure_type', 'usan_stem_definition', 'natural_product', 'black_box_warning', 'availability_type', 'inorganic_flag',
    'withdrawn_year', 'indication_class', 'usan_year', 'first_in_class', 'oral'
  ];
  tooltipDisabled: boolean;
  moleculeDictionaryTooltips = MoleculeDictionaryTooltips;

  constructor(private rest: RestService,
              private globalService: GlobalService,
              private router: Router) {
  }

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
    this.globalService.disableTooltip$.subscribe(
      data => this.tooltipDisabled = data
    );
    this.globalService.tableStructureSize$.subscribe(
      size => this.structureSize = size
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
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
            this.includeParams
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
    this.router.navigate(['activities'], {
      queryParams: {
        paramsType: ActivityListParamType.molecule_molregno,
        activityParams: molregno
      }
    });
  }

}
