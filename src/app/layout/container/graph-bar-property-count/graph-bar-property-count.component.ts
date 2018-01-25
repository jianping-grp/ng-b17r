import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {GlobalService} from '../../../services/global/global.service';
import {ActivityListParamType} from '../../../phin/activity-list-param-type.enum';

@Component({
  selector: 'app-graph-bar-property-count',
  templateUrl: './graph-bar-property-count.component.html',
  styleUrls: ['./graph-bar-property-count.component.css']
})
export class GraphBarPropertyCountComponent implements OnInit {
  tid: any;
  //需要4个参数：
  @Input() private url: string;
  @Input() private key: string;
  @Input() private field: string;
  @Input() private field_size: number; //范围尺寸大小。

  option_colors: string[] = ['#749f83', '#2f4554', '#61a0a8', '#91c7ae', '#d48265', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
  chartOption: any;
  key_len: number;

  constructor(private rest: RestService,
              private globalService: GlobalService,) {
  }

  ngOnInit() {

    this.rest.getDataList(
      this.url,
      0,
      99999999).subscribe(data => {
      const res = data[this.key];
      this.key_len = res.length;
      // fetch field data


      if (!this.chartOption && this.key_len > 0) {

        const field_size = this.field_size;
        let dict_temp: any;
        dict_temp = this.compound_handle_to_dict(res, res.length, field_size, this.field);
        const field_arr = this.compound_handle_to_arr(dict_temp, field_size);

        const size = field_size;
        const str: string = this.field;
        const data_arr = field_arr;
        const bar_width: number | string = '25%';
        const option_color: string = this.option_colors.shift();
        this.chartOption = {
          tooltip: {
            'trigger': 'item',
            'formatter': (params) => {
              let arr = params.value;
              let fir = (+arr[0] - size / 2).toString(),
                sec = (+arr[0] + size / 2).toString();
              return fir + ' <= ' + str + ' < ' + sec + ' (' + arr[1].toString() + ')';
            }
          },
          dataZoom: [
            {
              type: 'slider',
              start: 0
            },
          ],
          xAxis: {
            name: str + '(Bin size ' + size.toString() + ')',
            nameLocation: 'center',
            nameGap: 35,
            type: 'value',
            interval: size,
            max: (value) => {
              return Math.ceil(value.max + Math.ceil(size));
            },
            min: (value) => {
              return Math.floor(value.min - Math.floor(size / 2));
            }
          },
          yAxis: {
            name: 'Compound Count',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 90,
            type: 'value',
            min: 0
          },
          series: [{
            type: 'bar',
            itemStyle: {
              normal: {
                color: option_color
              }
            },
            barMaxWidth: bar_width,
            data: data_arr
          }]
        };
      }


    });


  }

  chartClick(params) {
    console.log('bar-Params', params); // todo delete
    const reg = /tid}=(\d+)/;
    this.tid = +(reg.exec(this.url)[1]);
    console.log('获取bar-tid的值', this.tid, typeof(this.tid)); // todo delete
    const median = params.data[0];
    const max_value = median + this.field_size / 2;
    const min_value = median - this.field_size / 2;
    this.globalService.gotoActivityList(ActivityListParamType.tid_moleculeProperty, {
      tid: this.tid,
      moleculeProperty: this.field,
      max_value: max_value,
      min_value: min_value,
    });
  }

  compound_handle_to_dict(arr: any[], len: number, size: number, item: string) {
    //arr为源数组，len表示arr数组长度，size为基数尺寸
    let dict = {};
    for (let i = len - 1; i >= 0; i--) {
      let index = Math.floor(arr[i][item] / size);
      if (dict[index]) {
        dict[index]++;
      }
      else {
        dict[index] = 1;
      }
    }
    return dict;
  }

  compound_handle_to_arr(dict: any, size: number) {
    let arr: any[] = [];
    for (let x in dict) {
      arr.push([size / 2 + size * (+x), dict[x]]);
    }
    return arr;
  }


}
