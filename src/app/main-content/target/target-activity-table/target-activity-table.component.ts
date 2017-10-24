import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {DataSource} from '@angular/cdk/collections';
import {Activity} from '../../../models/chembl/activity';
import {ActivitiesDataSource} from '../../activity/activities-data-source';
import {CompoundStructures} from '../../../models/chembl/compound-structures';

@Component({
  selector: 'app-target-activity-table',
  templateUrl: './target-activity-table.component.html',
  styleUrls: ['./target-activity-table.component.css']
})
export class TargetActivityTableComponent implements OnInit {
  dataSource: DataSource<Activity>;
  pageMeta: PageMeta = null;
  structureList: CompoundStructures[] = null;
  includeParam = '&exclude[]=molregno.*&exclude[]=molregno.compoundstructures.*&include[]=molregno.compoundstructures.canonical_smiles&include[]=molregno.compoundstructures.molregno'
  @Input() restUrl = '';
  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('target activity table init.')
    this.route.parent.paramMap.subscribe(
      (params: ParamMap) => {
        let tid = params.get('tid');
        this.restUrl = `chembl/activities/?filter{assay.tid}=${tid}${this.includeParam}`
      }
    )
  }
  // getActivityData(tid: string, page?, perPage?) {
  //   this.rest.getDataList(
  //     `chembl/activities/?filter{assay.tid}=${tid}`,
  //     page,
  //     perPage,
  //     '',
  //     this.includeParam
  //   ).subscribe(
  //     data => {
  //       this.dataSource = new ActivitiesDataSource(data['activities']);
  //       this.pageMeta = data['meta'];
  //       this.structureList = data['compound_structures'];
  //     }
  //   )
  // }

}
