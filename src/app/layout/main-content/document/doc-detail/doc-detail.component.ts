import { Component, OnInit } from '@angular/core';
import {Doc} from '../../../../chembl/models/doc';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.css']
})
export class DocDetailComponent implements OnInit {
  doc: Doc | null;

  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const docId = params.get('docId');
      this.rest.getDocById(docId)
        .subscribe(data => {
          this.doc = data;
        });
    });
  }

}
