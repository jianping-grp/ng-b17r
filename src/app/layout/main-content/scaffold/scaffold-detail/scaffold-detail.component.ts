import { Component, OnInit } from '@angular/core';
import {Scaffold} from '../../../../phin/models/scaffold';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../../services/rest/rest.service';

@Component({
  selector: 'app-scaffold-detail',
  templateUrl: './scaffold-detail.component.html',
  styleUrls: ['./scaffold-detail.component.css']
})
export class ScaffoldDetailComponent implements OnInit {
  scaffold: Scaffold;
  constructor(
    private route: ActivatedRoute,
    private rest: RestService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const scaffoldId = params.get('scaffoldId');
      // fetch target data
      this.rest.getData(`phin/scaffolds/${scaffoldId}`)
        .subscribe(
          data => {
            this.scaffold = data['scaffold'];
          }
        );
    });
  }

}
