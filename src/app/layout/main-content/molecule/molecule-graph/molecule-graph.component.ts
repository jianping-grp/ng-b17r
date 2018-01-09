import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from "@angular/router";

@Component({
  selector: 'app-molecule-graph',
  templateUrl: './molecule-graph.component.html',
  styleUrls: ['./molecule-graph.component.css']
})
export class MoleculeGraphComponent implements OnInit {

  pie_act_url:string;
  pie_act_key:string;
  pie_act_field:string;

  pie_assay_url:string;
  pie_assay_key:string;
  pie_assay_field:string;
  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(
      (params: Params) => {
        const molId= +(params.params.molregno);
        console.log('molId', molId );

        this.pie_act_url=`chembl/activities/?filter{molregno}=${molId}&exclude[]=*&include[]=standard_type`;
        this.pie_act_key='activities';
        this.pie_act_field='standard_type';

        this.pie_assay_url=`chembl/assays/?filter{activities_set.molregno}=${molId}&exclude[]=*&include[]=assay_type`;
        this.pie_assay_key='assays';
        this.pie_assay_field='assay_type';

      }
    )

  }

}
