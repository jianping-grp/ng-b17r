import {DataSource} from '@angular/cdk/collections';
import {TargetDictionary} from '../../models/target-dictionary';
import {Observable} from 'rxjs/Observable';
import {MdPaginator} from '@angular/material';
import {RestService} from '../../rest/rest.service';

export class TargetDictionaryDataSource extends DataSource<TargetDictionary> {
  constructor(
    private _keyword: string,
    private _paginator: MdPaginator,
    private _rest: RestService
  ) {
    super();
  }
  connect(): Observable<TargetDictionary[]> {
    return this._rest.keywordSearch (
      this._keyword,
      'target',
      this._paginator.pageIndex,
      this._paginator.pageSize)
  }

  disconnect() {
  }
}
