import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Assay} from '../../../../chembl/models/assay';
import {Doc} from '../../../../chembl/models/doc';
import {TargetDictionary} from '../../../../chembl/models/target-dictionary';

@Component({
  selector: 'app-assay-detail',
  templateUrl: './assay-detail.component.html',
  styleUrls: ['./assay-detail.component.css']
})
export class AssayDetailComponent implements OnInit {
  assay: Assay | null;
  doc: Doc | null;
  targetDictionary: TargetDictionary | null;
  includeParams = 'include[]=tid.*&include[]=doc.*';
  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const assayId = params.get('assayId');
      this.rest.getData(`chembl/assays/${assayId}/?${this.includeParams}`)
        .subscribe(data => {
          this.assay = data['assays'];
          this.doc = data['docs'][0];
          this.targetDictionary = data['target_dictionaries'][0];
          }
        );
    });
  }

}
