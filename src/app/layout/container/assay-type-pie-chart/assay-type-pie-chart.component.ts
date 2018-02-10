import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {countBy, forEach} from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {RestService} from '../../../services/rest/rest.service';
import {AssayType} from '../../../chembl/models/assay-type';
import {Assay} from '../../../chembl/models/assay';
import {GlobalService} from '../../../services/global/global.service';
import {ActivityListParamType} from '../../../phin/activity-list-param-type.enum';

@Component({
  selector: 'app-assay-type-pie-chart',
  templateUrl: './assay-type-pie-chart.component.html',
  styleUrls: ['./assay-type-pie-chart.component.css']
})
export class AssayTypePieChartComponent implements OnInit {

  @Input() tid: number;
  @Input() molregno: number;
  echart: any;
  assayTypeList: AssayType[];
  assayList: Assay[];
  includeParams = '&include[]=assay_type.*&exclude[]=*';
  initOptions = {
    tooltip: {
      trigger: 'item',
      formatter: param => {
        return `Assay type:<br/>${this.getAssayTypeDesc(param.name)}` +
          `(${param.name}) ${param.value} (${param.percent}%)`;
      }
    },
    title: {},
    legend: {
      orient: 'vertical',
      type: 'scroll',
      left: 'left',
      formatter: param => `${this.getAssayTypeDesc(param)} (${param})`
    },
    series: [{
      name: 'Assay type',
      type: 'pie',
      radius: '65%',
      center: ['50%', '60%'],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0,0,0,0.5)'
        }
      }
    }]
  };

  constructor(private route: ActivatedRoute,
              private globalService: GlobalService,
              private rest: RestService) {
  }

  ngOnInit() {
    // console.log(`assay type pie init`);
  }

  onChartInit(ec) {
    this.echart = ec;
    this.echart.showLoading();
    let restUrl = `chembl/assays/?filter{tid}=${this.tid}`;
    if (this.molregno !== undefined) {
      restUrl = `chembl/assays/?filter{activities_set.molregno}=${this.molregno}`;
    }
    this.rest.getDataList(
      restUrl,
      0,
      99999999,
      '',
      this.includeParams
    ).subscribe(
      data => {
        this.assayTypeList = data['assay_types'];
        this.assayList = data['assays'];
        // init chart
        this.updateData();
      },
      () => {
        this.echart.hideLoading();
      }
    );
  }

  updateData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    if (this.assayList === undefined || this.assayTypeList === undefined) {
      this.echart.hideLoading();
      return;
    }
    const pieData = [];
    forEach(
      countBy(this.assayList, (el: Assay) => el.assay_type),
      (v, k) => pieData.push({name: k, value: v})
    );
    const legendData = pieData.map(el => el.name);
    this.echart.setOption({
      legend: {
        data: legendData
      },
      series: [
        {
          data: pieData
        }
      ]
    });
    this.echart.hideLoading();
  }

  getAssayTypeDesc(assayType): string {
    if (this.assayTypeList !== undefined) {
      return this.assayTypeList.find(el => el.assay_type === assayType).assay_desc;
    }
  }

  onDbClick(event) {
    // console.log(event);
    // clicked assay type event.data.name
    this.globalService.gotoActivityList(ActivityListParamType.mix, {
      assay_type: event.data.name,
      tid: this.tid,
      molregno: this.molregno
    });
  }
}
