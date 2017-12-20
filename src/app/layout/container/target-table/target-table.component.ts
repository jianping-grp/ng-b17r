import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TargetType} from '../../../chembl/models/target-type';
import {PageMeta} from '../../models/page-meta';

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})
export class TargetTableComponent implements OnInit {

  targetTypeList: TargetType[] | null;
  pageMeta: PageMeta | null;
  displayedColumns = [
    'chembl', 'pref_name',
    'organism', 'uniprot', 'target_type', 'assays_count']
  extraParam = '&include[]=target_type.*';
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  restUrl = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

}
