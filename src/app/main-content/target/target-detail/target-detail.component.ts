import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../rest/rest.service';
import {ActivatedRoute, Router, ParamMap, Params} from '@angular/router'
import {TargetDictionary} from '../../../models/target-dictionary';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.css']
})
export class TargetDetailComponent implements OnInit {
  targetDictionary$: Observable<TargetDictionary>;

  constructor(
    private route: ActivatedRoute,
    private rest: RestService
  ) { }

  ngOnInit() {
    console.log('target detail init');
    this.targetDictionary$ = this.route.paramMap.switchMap(
      (params: ParamMap) => {
        return this.rest.getTargetDictionaryByChemblId(params.get('chembl'))
          .map(data => data['target_dictionaries'][0]);
      }
    )
  }

}
