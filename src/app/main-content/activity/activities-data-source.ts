import {DataSource} from '@angular/cdk/collections';
import {Activity} from '../../models/chembl/activity';
import {Observable} from 'rxjs/Observable';
import {MatPaginator, MatSort} from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/combineLatest';

export class ActivitiesDataSource extends DataSource<Activity> {
  private _activityList: Activity[] | Observable<Activity[]>;

  constructor(activityList?: Activity[] | Observable<Activity[]>,
              private _paginator?: MatPaginator,
              private _sort?: MatSort) {
    super();
    this._activityList = activityList;
  }

  connect(): Observable<Activity[]> {
    if (this._activityList instanceof Observable) {
      if (this._paginator === undefined) {
        return this._activityList
      }
      else {
        return Observable.combineLatest(this._activityList, this._paginator.page, (data, paginator) => {
          const startIndex = paginator['pageIndex'] * paginator['pageSize'];
          return data.slice(startIndex, paginator['pageSize']);
        });
      }
    }
    else {
      if (this._paginator === undefined && this._sort === undefined){
        return Observable.of(this._activityList)
      }
      const dataChanges = [
        this._paginator.page,
        this._sort.sortChange
      ]
      return Observable.merge(...dataChanges).startWith(this._paginator).map(
        () => {
          //sort
          this.sortData();
          const startIndex = this._paginator['pageIndex'] * this._paginator['pageSize'];
          return (<Activity[]>this._activityList).slice(startIndex, startIndex + this._paginator['pageSize'])
        }
      )
    }

  }
  sortData(){
    return (<Activity[]>this._activityList).sort((x, y) => {
      let prop = this._sort.active;
      let valueX = isNaN(x[prop]) ? x[prop]: +x[prop];
      let valueY = isNaN(y[prop]) ? y[prop]: +y[prop];
      return (valueX < valueY ? -1: 1) * (this._sort.direction == 'asc'? 1: -1);
      }
    )
  }
  disconnect() {
  }
}
