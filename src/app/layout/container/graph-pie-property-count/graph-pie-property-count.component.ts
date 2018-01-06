import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../../services/rest/rest.service";

@Component({
  selector: 'app-graph-pie-property-count',
  templateUrl: './graph-pie-property-count.component.html',
  styleUrls: ['./graph-pie-property-count.component.css']
})
export class GraphPiePropertyCountComponent implements OnInit {
  //docs:3个必须参数，目的统计属性数量。即：统计field的数量
  @Input()private url:string; //表示url
  @Input()private key:string; //比如：key值activities
  @Input()private field:string; //表示key：value下的属性类型;即：你要查询的字段

  private chartOption:any;
  private key_len:number;
  private chartStyle:any;
  private data_arr:any;

  constructor(
    private rest:RestService
  ) {
    this.chartStyle={
      'height':'500px'
    }
  }

  ngOnInit() {
    // ${this.url}=${this.tid}
    this.rest.getDataList(
      `${this.url}`,
      0,
      99999999).subscribe(
      data=>{
        const val=data[this.key];
        this.key_len=val.length;

        if (!this.chartOption && this.key_len > 0){
          const temp_dict=this.arr_to_dict(val,this.field);
          const data_arr=this.dict_to_arr(temp_dict);
          const data_arr_len=data_arr.length;

          if (data_arr_len>40){
            this.chartStyle={
              'height':'700px'
            }
          }
          this.data_arr=data_arr;

          this.chartOption={
            "tooltip": {
              "trigger": "item",
              "formatter": `{a}: <br/>{b}: {c} ${this.key} ({d}%)`
            },
            "legend": {
              "orient": "vertical",
              "x": "left",
              "data": data_arr,
              "formatter":function (name) {
                return name +': '+temp_dict[name];//field undefined
              }
            },
            "series": [
              {
                "center":data_arr.length<=40?['50%','50%']:['70%','70%'],
                "radius":data_arr.length<=40?[0,'60%']:[0,'40%'],
                "name": this.field,
                "type": "pie",
                "data": data_arr
              }
            ]
          };
        }
      }
    );
  }

  arr_to_dict(data:any[],item:string){
    let dict={};
    for (let i=data.length-1;i>=0;i--){
      let temp=dict[data[i][item]];
      if(temp){
        dict[data[i][item]]++;
      }
      else{
        dict[data[i][item]]=1;
      }
    }
    return dict;
  }

  dict_to_arr(dict:any){
    let arr:any[]=[];
    for (let x in dict){
      arr.push({name:x,value:dict[x]})
    }
    return arr;
  }

}
