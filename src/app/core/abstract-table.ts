import {Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export abstract class AbstractTable {
  @Input() displayedColumns: string[];
  @Input() restUrl: string;
  @Input() sortColumns: string[];
  @Input() pagination: boolean;


}
