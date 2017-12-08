import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import { Activity, CompoundStructures, MoleculeDictionary } from '../../../../chembl/models';
import {PageMeta} from '../../../models';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements OnInit {
  @Input() dataSource: DataSource<Activity[]> = null;
  @Input() moleculeDictionaryList: MoleculeDictionary[] = [];
  @Input() pageMeta: PageMeta = null;
  @Input() displayedColumns: string[] = null;
  @Output() onPageChange = new EventEmitter<PageMeta>();

  constructor() {
  }

  ngOnInit() {
    //todo remove: test code
    this.displayedColumns = [
      'molregno', 'standard_type', "data_validity_comment",
      'standard_value', 'standard_relation', 'uo_units'
    ]
  }

  pageChangeHandler(meta: PageMeta) {
    this.onPageChange.emit(meta);
    this.pageMeta = meta;
  }

  getSmiles(molregno: number): string {
    let mol = this.moleculeDictionaryList.find(el => el.compoundstructures.molregno === molregno);
    if (mol) {
      return mol.compoundstructures.canonical_smiles;
    }
    return null;
  }

}
