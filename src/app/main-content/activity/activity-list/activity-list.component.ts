import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {PageMeta} from '../../../models/page-meta';
import {ActivitiesDataSource} from '../activities-data-source';
import {Activity} from '../../../models/activity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  pageMeta: PageMeta | null;
  activityListDataSource: ActivitiesDataSource | null;
  displayedColumns: string[];

  constructor(private route: ActivatedRoute,
              private rest: RestService) {
    this.displayedColumns = [
      'molregno', 'standard_type', "data_validity_comment",
      'standard_value', 'standard_relation', 'uo_units'
    ]
  }


  ngOnInit() {
    console.log('activity list init');
    this._getActivityList();

  }

  pageChange(event): void{
    console.log(event)
    this._getActivityList(event.pageIndex, event.pageSize);
  }

  private _getActivityList(page?, perPage?): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        // list activities by target id (tid)
        if (params.has('tid')){
          let tid = params.get('tid');
          this.rest.getActivitiesByTid(tid, page, perPage).subscribe(
            data => {
              this.activityListDataSource = new ActivitiesDataSource(data['activities']);
              this.pageMeta = data['meta'];

            }
          )
        }
      }
    )
  }

}
