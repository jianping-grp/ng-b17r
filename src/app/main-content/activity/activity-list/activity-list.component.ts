import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../services/rest/rest.service';
import {PageMeta} from '../../../models/page-meta';
import {ActivitiesDataSource} from '../activities-data-source';
import {Activity} from '../../../models/chembl/activity';
import {CompoundStructures} from '../../../models/chembl/compound-structures';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  pageMeta: PageMeta | null;
  activityList: Activity[];
  compoundStructuresList: CompoundStructures[];
  activityListDataSource: ActivitiesDataSource | null;
  displayedColumns: string[];
  includeParam = '&exclude[]=molregno.*&exclude[]=molregno.compoundstructures.*&include[]=molregno.compoundstructures.canonical_smiles&include[]=molregno.compoundstructures.molregno'

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

  pageChange(event): void {
    console.log(event)
    this._getActivityList(event.pageIndex, event.pageSize);
  }

  getSmiles(molregno: number): string{
    let structure = this.compoundStructuresList.find(el=>el.molregno===molregno);
    if(structure){
      return structure.canonical_smiles
    }
    return null;
  }
  private _getActivityList(page?, perPage?): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        // list activities by target id (tid)
        if (params.has('tid')) {
          let tid = params.get('tid');
          this.rest.getDataList(
            `chembl/activities/?filter{assay.tid}=${tid}`,
            page,
            perPage,
            '',
            this.includeParam).subscribe(
            data => {
              this.activityList = data['activities'];
              this.compoundStructuresList = data['compound_structures'];
              this.activityListDataSource = new ActivitiesDataSource(data['activities']);
              this.pageMeta = data['meta'];
            }
          )
        }
      }
    )
  }

}
