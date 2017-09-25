import {DataSource} from '@angular/cdk/collections';
import {Activity} from '../../models/chembl/activity';
import {Observable} from 'rxjs/Observable';

export class ActivitiesDataSource extends DataSource<Activity>{
  private _activityList: Activity[];
  constructor(activityList?) {
    super();
    this._activityList = activityList;
  }
  connect(): Observable<Activity[]>{
    return Observable.of(this._activityList);
  }
  disconnect() {}
}
