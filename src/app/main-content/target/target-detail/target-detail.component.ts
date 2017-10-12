import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {ActivatedRoute, Router, ParamMap, Params} from '@angular/router'
import {TargetDictionary} from '../../../models/chembl/target-dictionary';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {TargetComponents} from '../../../models/chembl/target-components';
import {ComponentSequences} from '../../../models/chembl/component-sequences';
import {Activity} from '../../../models/chembl/activity';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.css']
})
export class TargetDetailComponent implements OnInit {
  targetDictionary: TargetDictionary;
  targetComponentsList: TargetComponents[];
  componentSequencesList: ComponentSequences[];
  activityList: Activity[];
  activities$: Observable<Activity[]>;
  includeParam = '/?include[]=targetcomponents_set.*&include[]=targetcomponents_set.component.*'

  constructor(private route: ActivatedRoute,
              private rest: RestService) {
  }

  ngOnInit() {
    console.log('target detail init');
    this.route.paramMap.subscribe((params: ParamMap) => {
      let tid = params.get('tid');
      // fetch target data
      this.rest.getData(`chembl/target-dictionaries/${tid}${this.includeParam}`)
        .subscribe(
          data => {
            this.targetDictionary = data['target_dictionary'];
            this.targetComponentsList = data['target_components'];
            this.componentSequencesList = data['component_sequences'];
          }
        );
      // fetch activity data
      this.activities$ = this.rest.getDataList(
        `chembl/activities/?filter{assay.tid}=${tid}`,
        0,
        99999999).map(data => {
        return data['activities']
      })
      //   .subscribe(
      //     data => {
      //       this.activityList = data['activities']
      //     }
      // )

    })
  }

}
