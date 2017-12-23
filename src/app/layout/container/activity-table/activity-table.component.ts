import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import {RestService} from '../../../services/rest/rest.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {PageMeta} from '../../models';
import {CompoundStructures, MoleculeDictionary} from '../../../chembl/models';
import {DocCardComponent} from '../../../shared/chembl-explorer/doc-card/doc-card.component';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements OnInit, AfterViewInit {
  pageMeta: PageMeta | null;
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  moleculeDictionaries: MoleculeDictionary[];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
              private rest: RestService,
              public docDialog: MatDialog
              ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    merge(this.sort.sortChange, this.paginator.page, this.restUrl$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.rest.getDataList(this.restUrl, this.paginator.pageIndex);
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
    const mol = this.moleculeDictionaries.find(el => (<CompoundStructures>el.compoundstructures).molregno === molregno);
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
