import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {TargetDictionary} from '../../chembl/models/target-dictionary';

export class TargetDictionaryDataSource extends DataSource<TargetDictionary> {
  private _targetList: TargetDictionary[];
  constructor(targetList) {
    super();
    this._targetList = targetList;
  }
  connect(): Observable<TargetDictionary[]> {
    return Observable.of(this._targetList)
  }

  disconnect() {
  }
}
