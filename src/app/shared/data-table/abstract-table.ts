import {Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {PageMeta} from '../../models/page-meta';

export abstract class AbstractTable {
  @Input() dataSource: DataSource<any>;
  @Input() displayedColumns: string[];
  @Input() restUrl: string;
  //@Input() sortColumns: string[];
  @Input() pagination: boolean;
  pageMeta: PageMeta = null;

}
