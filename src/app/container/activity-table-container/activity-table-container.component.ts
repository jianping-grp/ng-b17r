import {Component, Input, OnInit} from '@angular/core';
import {PageMeta} from '../../models/page-meta';
import {RestService} from '../../services/rest/rest.service';
import {ActivitiesDataSource} from '../../main-content/activity/activities-data-source';
import {CompoundStructures} from '../../models/chembl/compound-structures';

@Component({
  selector: 'app-activity-table-container',
  templateUrl: './activity-table-container.component.html',
  styleUrls: ['./activity-table-container.component.css']
})
export class ActivityTableContainerComponent implements OnInit {
  @Input() restUrl: string = null;
  @Input() displayedColumns: string[] = null;

  activityListDataSource: ActivitiesDataSource = null;
  compoundStructuresList: CompoundStructures[] = null;
  pageMeta: PageMeta = null;

  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
    this._getActivityList(this.restUrl, 0, 5)
  }
  //update data after pagination changed
  pageChange(meta){
    this._getActivityList(this.restUrl, meta.pageIndex, meta.pageSize)
  }
  private _getActivityList(restUrl: string, page: number, perPage: number): void {

          this.rest.getDataList(
            this.restUrl,
            page,
            perPage,
            '',
            '').subscribe(
            data => {
              this.compoundStructuresList = data['compound_structures'];
              this.activityListDataSource = new ActivitiesDataSource(data['activities']);
              this.pageMeta = data['meta'];
            }
          )
        }

}
