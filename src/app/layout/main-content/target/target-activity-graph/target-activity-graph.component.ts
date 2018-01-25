import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-activity-graph',
  templateUrl: './target-activity-graph.component.html',
  styleUrls: ['./target-activity-graph.component.css']
})
export class TargetActivityGraphComponent implements OnInit {
  tid: number;
  // activities
  pie_act_url: string;
  pie_act_key: string;
  pie_act_field: string;


  // assays
  pie_assay_url: string;
  pie_assay_key: string;
  pie_assay_field: string;

  // assays_len:number;
  // assay_type_dict:any={};
  // assay_type_arr:any[]=[];
  // assay_types:any={};
  // assay_type_maps:any={};

  // compound_properties
  bar_psa_url: string;
  bar_psa_key: string;
  bar_psa_field: string;
  bar_psa_field_size: number;

  bar_alogp_url: string;
  bar_alogp_key: string;
  bar_alogp_field: string;
  bar_alogp_field_size: number;

  bar_mw_url: string;
  bar_mw_key: string;
  bar_mw_field: string;
  bar_mw_field_size: number;


  // ligand_effs
  scatter_tid: number;

  // year
  line_year_url: string;
  line_year_key: string;
  line_year_field: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(
      (params: ParamMap) => {
        const tid = +(params.get('tid'));
        this.tid = tid;
        // this.restUrl = `chembl/activities/?filter{assay.tid}=${tid}${this.includeParam}`
        // const tid=130;

        // fetch assays data for a tid
        this.pie_assay_url = `chembl/assays/?filter{tid}=${tid}&exclude[]=*&include[]=assay_type`;
        this.pie_assay_key = 'assays';
        this.pie_assay_field = 'assay_type';

        // fetch activity data for a tid;
        this.pie_act_url = `chembl/activities/?filter{assay.tid}=${tid}&exclude[]=*&include[]=standard_type.*`;
        this.pie_act_field = 'standard_type';
        this.pie_act_key = 'activities';

        // year
        this.line_year_url = `chembl/docs/?filter{assays_set.tid}=${tid}&filter{year.gt}=0&exclude[]=*&include[]=year`;
        this.line_year_key = 'docs';
        this.line_year_field = 'year';

        // fetch compound-properties data for a tid
        this.bar_psa_url = `chembl/compound-properties/?filter{molregno.activities_set.assay.tid}=${tid}&exclude[]=*&include[]=psa`;
        this.bar_psa_key = 'compound_properties';
        this.bar_psa_field = 'psa';
        this.bar_psa_field_size = 50;

        this.bar_alogp_url = `chembl/compound-properties/?filter{molregno.activities_set.assay.tid}=${tid}&exclude[]=*&include[]=alogp`;
        this.bar_alogp_key = 'compound_properties';
        this.bar_alogp_field = 'alogp';
        this.bar_alogp_field_size = 1;

        this.bar_mw_url = `chembl/compound-properties/?filter{molregno.activities_set.assay.tid}=${tid}&exclude[]=*&include[]=mw_freebase`;
        this.bar_mw_key = 'compound_properties';
        this.bar_mw_field = 'mw_freebase';
        this.bar_mw_field_size = 50;

        // fetch ligand-effs for a tid
        this.scatter_tid = tid;


      }
    );
  }
}
