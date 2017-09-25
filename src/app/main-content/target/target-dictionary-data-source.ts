import {DataSource} from '@angular/cdk/collections';
import {TargetDictionary} from '../../models/chembl/target-dictionary';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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
