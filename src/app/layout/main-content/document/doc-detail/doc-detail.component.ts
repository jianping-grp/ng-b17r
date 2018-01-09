import { Component, OnInit } from '@angular/core';
import {Doc} from '../../../../chembl/models/doc';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {TargetType} from "../../../../chembl/models/target-type";

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.css']
})
export class DocDetailComponent implements OnInit {
  doc: Doc | null;
  targetTypeList: TargetType | null ;
  incledeParam = '&exclude[]=tid.*&include[]=tid.tid&include[]=tid.pref_name';
  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const docId = params.get('docId');
      this.rest.getDocById(docId).subscribe(data => {
          this.doc = data;});
     this.rest.getDataList(`chembl/assays/?filter{doc.doc_id}=${docId}${this.incledeParam}`,0, 99999)
       .subscribe(data => {
         this.targetTypeList = data['target_dictionaries'];
       })
    });
  }

}
