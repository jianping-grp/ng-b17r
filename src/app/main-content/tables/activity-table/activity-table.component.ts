import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Activity} from '../../../models/chembl/activity';
import {ActivitiesDataSource} from '../../activity/activities-data-source';
import {Observable} from 'rxjs/Observable';
import {MatPaginator, MatSort} from '@angular/material';
import {RestService} from '../../../services/rest/rest.service';
import {AbstractTable} from '../../../core/abstract-table';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent extends AbstractTable implements OnInit{
  @Input() activities: Activity[];
  @Input() activities$: Observable<Activity[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  activityListSource: ActivitiesDataSource | null;
  constructor() {
    super();
    this.displayedColumns = [
      'assay', 'molregno', 'pchembl_value', 'standard_type', 'standard_relation',
      'standard_value'
    ]
  }

  ngOnInit() {
    // fetch data from rest
    if (this.restUrl !== undefined){

    }
    //Observable data
    else if (this.activities$ instanceof Observable){
      this.activities$.subscribe(data => {
        this.activities = data;
        this.activityListSource = new ActivitiesDataSource(
          this.activities,
          this.paginator,
          this.sort
        )
      })
    }
    // this.activity$.subscribe(data =>{
    //   this.activityList = data;
    //   this.activityListSource = new ActivitiesDataSource(this.activityList, this.paginator, this.sort)
    // })
    //this.activityListSource = new ActivitiesDataSource(this.activityList, this.paginator);
  }

}
