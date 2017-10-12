import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Activity} from '../../../models/chembl/activity';
import {ActivitiesDataSource} from '../../activity/activities-data-source';
import {Observable} from 'rxjs/Observable';
import {MatPaginator, MatSort} from '@angular/material';
import {RestService} from '../../../services/rest/rest.service';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements OnInit {
  @Input() activity$: Observable<Activity[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  activityList: Activity[] | null;
  activityListSource: ActivitiesDataSource | null;
  displayedColumns = [
    'assay', 'molregno', 'pchembl_value', 'standard_type', 'standard_relation',
    'standard_value'
  ]
  constructor() { }

  ngOnInit() {
    this.activity$.subscribe(data =>{
      this.activityList = data;
      this.activityListSource = new ActivitiesDataSource(this.activityList, this.paginator, this.sort)
    })
    //this.activityListSource = new ActivitiesDataSource(this.activityList, this.paginator);
  }

}
