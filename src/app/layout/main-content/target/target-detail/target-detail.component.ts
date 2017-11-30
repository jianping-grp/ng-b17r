import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, ParamMap, Params} from '@angular/router'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {TargetNetworkComponent} from '../target-network/target-network.component';
import {TargetDictionary} from '../../../../chembl/models/target-dictionary';
import {TargetComponents} from '../../../../chembl/models/target-components';
import {ComponentSequences} from '../../../../chembl/models/component-sequences';
import {Activity} from '../../../../chembl/models/activity';
import {RestService} from '../../../../services/rest/rest.service';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.css']
})
export class TargetDetailComponent implements OnInit {
  @ViewChild(TargetNetworkComponent)
    private targetNetwork: TargetNetworkComponent;
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
      // this.activities$ = this.rest.getDataList(
      //   `chembl/activities/?filter{assay.tid}=${tid}`,
      //   0,
      //   99999999).map(data => {
      //   return data['activities']
      // })
      //   .subscribe(
      //     data => {
      //       this.activityList = data['activities']
      //     }
      // )

    })
  }

}
