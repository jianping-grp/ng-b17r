import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/do';
import {TargetNetworkComponent} from '../target-network/target-network.component';
import {TargetDictionary} from '../../../../chembl/models/target-dictionary';
import {TargetComponents} from '../../../../chembl/models/target-components';
import {ComponentSequences} from '../../../../chembl/models/component-sequences';
import {RestService} from '../../../../services/rest/rest.service';
import {KeggDisease} from '../../../../phin/models/kegg-disease';
import {GlobalService} from '../../../../services/global/global.service';
import {TargetsListParamType} from '../../../../phin/targets-list-param-type.enum';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.css']
})
export class TargetDetailComponent implements OnInit {
  @ViewChild(TargetNetworkComponent)
  private targetNetwork: TargetNetworkComponent;
  targetDictionary: TargetDictionary;
  relatedTargetDictionaries: TargetDictionary[];
  keggDiseaseList: KeggDisease[];
  includeParam = '/?include[]=targetcomponents_set.component.keggdisease_set.*' +
    `&include[]=related_target.tid.`;

  constructor(private route: ActivatedRoute,
              private globalService: GlobalService,
              private rest: RestService) {
  }

  ngOnInit() {
    console.log('target detail init');
    this.route.paramMap.subscribe((params: ParamMap) => {
      const tid = params.get('tid');
      // fetch target data
      this.rest.getData(`chembl/target-dictionaries/${tid}${this.includeParam}`)
        .subscribe(
          data => {
            this.targetDictionary = data['target_dictionary'];
            this.keggDiseaseList = data['kegg_diseases'];
            this.relatedTargetDictionaries = data['+target_dictionaries'];
          }
        );
    });
  }

  getTargetDictionary(tid: number): TargetDictionary {
    if (this.targetDictionary.tid === tid) {
      return this.targetDictionary;
    } else {
      return this.relatedTargetDictionaries.find(el => el.tid === tid);
    }
  }

  onDiseaseClick(diseaseId) {
    this.globalService.gotoTargetList(TargetsListParamType.keggDisease, diseaseId);
  }

}
