import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-activity-graph',
  templateUrl: './target-activity-graph.component.html',
  styleUrls: ['./target-activity-graph.component.css']
})
export class TargetActivityGraphComponent implements OnInit {
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
        // this.restUrl = `chembl/activities/?filter{assay.tid}=${tid}${this.includeParam}`
        // const tid=130;

        // fetch assays data for a tid
        this.pie_assay_url = `chembl/assays/?filter{tid}=${tid}&exclude[]=*&include[]=assay_type`;
        this.pie_assay_key = 'assays';
        this.pie_assay_field = 'assay_type';

        // fetch assay-types data;
        // this.rest.getDataList(
        //   'chembl/assay-types/?',
        //   0,
        //   99999999)
        //   .subscribe(data=>{
        //   const res = data['assay_types'];
        //   this.assay_type_maps=this.assay_type_to_dict(res, 'assay_type','assay_desc');
        // })

        // fetch assays data for a tid
        // this.rest.getDataList(
        //   `chembl/assays/?filter{tid}=${tid}&exclude[]=*&include[]=assay_type`,
        //   0,
        //   99999999).subscribe(data=>{
        //   const res=data['assays'];
        //   this.assays_len=res.length;
        //   this.assay_type_dict=this.iteration_to_dict(res,'assay_type');
        //   this.assay_type_arr=this.dict_to_arr(this.assay_type_dict);
        //
        //   this.chart2_emerge();
        // })


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

  // iteration_to_dict(data:any[],item:string){
  //   let dict={};
  //   for (let i=data.length-1;i>=0;i--){
  //     let temp=dict[data[i][item]];
  //     if(temp){
  //       dict[data[i][item]]++;
  //     }
  //     else{
  //       dict[data[i][item]]=1;
  //     }
  //   }
  //   return dict;
  // }
  //
  // dict_to_arr(dict:any){
  //   let arr:any[]=[];
  //   for (let x in dict){
  //     arr.push({name:x,value:dict[x]})
  //   }
  //   return arr;
  // }
  //
  // assay_type_to_dict(arr:any[],item1:string,item2:string){
  //   let dict={};
  //   for (let i=arr.length-1;i>=0;i--){
  //     dict[arr[i][item1]]=arr[i][item2];
  //   }
  //   return dict;
  // }

  // chart2_emerge(){
  //   if (!this.chartOption2 && this.assays_len > 0){
  //     const type_dict=this.assay_type_dict;
  //     const type_maps=this.assay_type_maps;
  //     const data_arr=this.assay_type_arr;
  //     this.chartOption2={
  //       "tooltip": {
  //         "trigger": "item",
  //         "formatter": "{a} <br/>{b}: {c} assays ({d}%)"
  //       },
  //       "legend": {
  //         "orient": "vertical",
  //         "x": "left",
  //         "data": data_arr,
  //         "formatter":function (name) {
  //           return  type_maps[name]+': '+type_dict[name];//standard_type undefined
  //         }
  //       },
  //       "series": [
  //         {
  //           "name": "Assays",
  //           "type": "pie",
  //
  //           "data": data_arr
  //         }
  //       ]
  //     };
  //   }
  // }


}
