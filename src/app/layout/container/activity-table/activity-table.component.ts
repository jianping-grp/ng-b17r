import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {PageMeta} from '../../models';
import {DocCardComponent} from '../../../shared/chembl-explorer/doc-card/doc-card.component';
import {MoleculeDictionary} from '../../../chembl/models/molecule-dictionary';
import {CompoundStructures} from '../../../chembl/models/compound-structures';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements OnInit, AfterViewInit {

  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  moleculeDictionaries: MoleculeDictionary[];
  @Input() tableTitle = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = [
    // 'activity_id',
    'assay', 'target_pref_name', 'standard_type', 'standard_value', 'published_type', 'published_value',
    'data_validity_comment', 'activity_comment', 'molregno', 'bao_endpoint', 'potential_duplicate',
    'standard_relation', 'published_relation', 'uo_units', 'ligandeff', 'standard_flag', 'pchembl_value',
    'doc',
    // 'qudt_units', 'record',
  ];

  constructor(private router: Router,
              private rest: RestService,
              public docDialog: MatDialog) {
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
          this.moleculeDictionaries = data['molecule_dictionaries'];
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

  getSmiles(molregno: number): string {
    const mol = this.moleculeDictionaries
      .find(el => (<CompoundStructures>el.compoundstructures).molregno === molregno);
    if (mol) {
      return (<CompoundStructures>mol.compoundstructures).canonical_smiles;
    }
    return null;
  }

  openDocDialog(docId: number): void {
    this.docDialog.open(DocCardComponent, {
      width: '600px',
      height: '550px',
      data: {
        docId: docId
      }
    });
  }

}
