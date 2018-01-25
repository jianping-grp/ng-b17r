import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PhinMolecule} from '../../../phin/models/phin-molecule';
import {MoleculeDictionary} from '../../../chembl/models/molecule-dictionary';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {merge} from 'rxjs/observable/merge';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../../services/rest/rest.service';
import {PageMeta} from '../../models';
import {PhinActivityListParamType} from '../../../phin/phin-activity-list-param-type.enum';
import {GlobalService} from '../../../services/global/global.service';

@Component({
  selector: 'app-molecule-network-table',
  templateUrl: './molecule-network-table.component.html',
  styleUrls: ['./molecule-network-table.component.css']
})
export class MoleculeNetworkTableComponent implements OnInit, AfterViewInit {
  phinMoleculeList: PhinMolecule[];
  @Input() restUrl$: Observable<string>;
  @Input() tableTitle = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() custom = true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  includeParams = '&exclude[]=mean' +
    '&exclude[]=first_molecule.molregno.compoundstructures.*' +
    '&include[]=second_molecule.molregno.compoundstructures.canonical_smiles' +
    '&exclude[]=second_molecule.molregno.compoundstructures.*' +
    '&exclude[]=first_molecule.molregno.*' +
    '&exclude[]=second_molecule.molregno.*' +
    '&include[]=first_molecule.molregno.compoundstructures.canonical_smiles';

  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl: string;
  allColumns = [
    'first_molecule', 'second_molecule', 'shared_targets'
  ];


  constructor(private router: Router,
              private globalSerive: GlobalService,
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
          this.phinMoleculeList = data['molecules'];
          return data['molecule_interactions'];
        }),
        catchError(() => {
          this.isLoadingError = true;
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe(
        data => this.dataSource.data = data
      );
  }

  getMolregnoObj(phinMolId): MoleculeDictionary {
    return this.phinMoleculeList.find(el => el.mol_id === phinMolId).molregno;
  }

  gotoPhinActivities(firstMolId, secondMolId) {
    this.globalSerive.gotoPhinActivityList(
      PhinActivityListParamType.molecule_molecule,
      {
        first_molecule: firstMolId,
        second_molecule: secondMolId
      }
    );
  }

}
