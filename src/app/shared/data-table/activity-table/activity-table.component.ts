import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractTable} from '../abstract-table';
import {DataSource} from '@angular/cdk/collections';
import {Activity} from '../../../models/chembl/activity';
import {PageMeta} from '../../../models/page-meta';
import {CompoundStructures} from '../../../models/chembl/compound-structures';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements OnInit {
  @Input() dataSource: DataSource<Activity[]> = null;
  @Input() compoundStructuresList: CompoundStructures[] = null;
  @Input() pageMeta: PageMeta = null;
  @Input() displayedColumns: string[] = null;
  @Output() onPageChange = new EventEmitter<PageMeta>();

  constructor() {
  }

  ngOnInit() {
    //to remove: test code
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
    let structure = this.compoundStructuresList.find(el => el.molregno === molregno);
    if (structure) {
      return structure.canonical_smiles
    }
    return null;
  }

}
