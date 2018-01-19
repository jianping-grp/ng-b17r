import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../../services/rest/rest.service";
import {Router} from "@angular/router";
import {GlobalService} from "../../../services/global/global.service";
import {ActivityListParamType} from "../../../phin/activity-list-param-type.enum";

@Component({
  selector: 'app-graph-pie-property-count',
  templateUrl: './graph-pie-property-count.component.html',
  styleUrls: ['./graph-pie-property-count.component.css']
})
export class GraphPiePropertyCountComponent implements OnInit {

  tid: any;
  molregno: any;
  //docs:3个必须参数，目的统计属性数量。即：统计field的数量
  @Input() private url: string; //表示url
  @Input() private key: string; //比如：key值activities
  @Input() private field: string; //表示key：value下的属性类型;即：你要查询的字段

  private chartOption: any;
  private key_len: number;
  private chartStyle: any;

  constructor(private rest: RestService,
              private globalService: GlobalService) {

  }

  ngOnInit() {
    // ${this.url}=${this.tid}
    this.rest.getDataList(
      `${this.url}`,
      0,
      99999999).subscribe(
      data => {
        const val = data[this.key];
        this.key_len = val.length;

        if (!this.chartOption && this.key_len > 0) {
          const temp_dict = this.arr_to_dict(val, this.field);
          const data_arr = this.dict_to_arr(temp_dict);
          const data_arr_len = data_arr.length;

          if (data_arr_len > 40) {
            this.chartStyle = {
              'height': '950px'
            }
          }

          this.chartOption = {
            "tooltip": {
              "trigger": "item",
              "formatter": `{a}: <br/>{b}: {c} ${this.key} ({d}%)`
            },
            "legend": {
              "type": 'scroll',
              "orient": "vertical",
              "x": "left",
              "data": data_arr,
              "formatter": function (name) {
                return name + ': ' + temp_dict[name];// field undefined
              }
            },

            "series": [
              {
                "radius":data_arr_len > 40 ? [0, '30%'] : [0, '60%'],
                "center":data_arr_len > 40 ? ['50%', '65%'] : ['50%', '50%'],
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

  arr_to_dict(data: any[], item: string) {
    let dict = {};
    for (let i = data.length - 1; i >= 0; i--) {
      let temp = dict[data[i][item]];
      if (temp) {
        dict[data[i][item]]++;
      }
      else {
        dict[data[i][item]] = 1;
      }
    }
    return dict;
  }

  dict_to_arr(dict: any) {
    let arr: any[] = [];
    for (let x in dict) {
      arr.push({name: x, value: dict[x]})
    }
    return arr;
  }

  chartClick(params) {
    console.log('pip-Params', params); // todo delete
    const tid_reg = /tid}=(\d+)/;
    const molregno_reg = /molregno}=(\d+)/;
    const tids = tid_reg.exec(this.url);
    const molregnoes = molregno_reg.exec(this.url);
    if (tids) {
      this.tid = tid_reg.exec(this.url)[1];
    } else if (molregnoes) {
      this.molregno = molregno_reg.exec(this.url)[1];
    }
    // 先判断id的类型，再判断key的类型
    if (this.tid) {
      if (this.key === 'assays') {
        const assay_type = params.name;
        this.globalService.gotoActivityList(ActivityListParamType.mix, {
            tid: this.tid,
            assay_type: assay_type,
          }
        );
      } else if (this.key === 'activities') {
        const standard_type = params.name;
        this.globalService.gotoActivityList(ActivityListParamType.mix, {
          tid: this.tid,
          standard_type: standard_type,
        });
      }
    } else if (this.molregno) {
      if (this.key === 'assays') {
        const assay_type = params.name;
        this.globalService.gotoActivityList(ActivityListParamType.mix, {
            molregno: this.molregno,
            assay_type: assay_type,
          }
        );
      } else if (this.key === 'activities') {
        const standard_type = params.name;
        this.globalService.gotoActivityList(ActivityListParamType.mix, {
          molregno: this.molregno,
          standard_type: standard_type,
        });
      }
    }
  }

}
