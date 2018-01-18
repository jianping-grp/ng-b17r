import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';

@Component({
  selector: 'app-graph-line-property-count',
  templateUrl: './graph-line-property-count.component.html',
  styleUrls: ['./graph-line-property-count.component.css']
})
export class GraphLinePropertyCountComponent implements OnInit {
  chartOption: any;
  key_len: number;
  tid: any;

  @Input() private url: string;
  @Input() private key: string;
  @Input() private field: string;

  constructor(private rest: RestService) {
  }

  ngOnInit() {

    this.rest.getDataList(
      this.url,
      0,
      99999999)
      .subscribe(data => {
        const val = data[this.key];
        this.key_len = val.length;

        if (!this.chartOption && this.key_len > 0) {
          const dict = this.handle_to_arr(val, this.key_len, this.field);
          const dataList = dict.dataList;
          const minVal = dict.minVal;
          const maxVal = dict.maxVal;
          const markArr = [{yAxis: maxVal / 4}, {yAxis: maxVal / 2}, {yAxis: maxVal / 4 * 3}, {yAxis: maxVal}];
          this.chartOption = {
            tooltip: {
              trigger: 'axis'
            },
            visualMap: {
              type: 'continuous',
              top: '10%',
              right: '4%',
              min: minVal,
              max: maxVal
            },
            dataZoom: [
              {
                type: 'slider',
                start: 50
              },
            ],
            xAxis: {
              data: dataList.map(function (item) {
                return item[0];
              })
            },
            yAxis: {
              splitLine: {
                show: false
              }
            },
            series: [
              {
                type: 'line',
                data: dataList.map(function (item) {
                  return item[1];
                }),
                markLine: {
                  silent: true,
                  data: markArr
                }
              }
            ]
          };
        }
      });
  }

  handle_to_arr(arr: any[], len: number, field: string) {
    let minVal: number, maxVal: number;
    let dataList = [];

    let temp_dict = {};
    let temp_arr = [];
    for (let i = len - 1; i >= 0; i--) {
      const year_num = arr[i][field] === null ? '无' : arr[i][field];
      if (!temp_dict[year_num]) {
        temp_dict[year_num] = 1;
      } else {
        ++temp_dict[year_num];
      }
    }

    for (let x in temp_dict) {
      const num = temp_dict[x];
      temp_arr.push(num);
      dataList.push([x, num]);
    }

    minVal = Math.min.apply(this, temp_arr);
    maxVal = Math.max.apply(this, temp_arr);

    return {
      dataList: dataList,
      minVal: minVal,
      maxVal: maxVal
    };
  }

  chartClick(params) {
    let reg = /tid}=(\d+)/;
    this.tid = reg.exec(this.url)[1];
    console.log('click获取tid,', this.tid);
    console.log('click获取年份,', params.name);
    console.log('click获取文章数目,', params.data);
  }


}
