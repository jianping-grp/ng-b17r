import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {Assay} from '../../../chembl/models/assay';
import {GlobalService} from '../../../services/global/global.service';
import {ActivityListParamType} from '../../../phin/activity-list-param-type.enum';
import {countBy, forEach} from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {Activity} from '../../../chembl/models/activity';

@Component({
  selector: 'app-activity-type-pie-chart',
  templateUrl: './activity-type-pie-chart.component.html',
  styleUrls: ['./activity-type-pie-chart.component.css']
})
export class ActivityTypePieChartComponent implements OnInit {

  @Input() tid: number;
  @Input() molregno: number;
  echart: any;
  activityList: Activity[];
  includeParams = '&include[]=standard_type&exclude[]=*';
  initOptions = {
    tooltip: {
      trigger: 'item',
      formatter: param => {
        return `Activity type:<br/>${param.name} ${param.value} (${param.percent}%)`;
      }
    },
    title: {},
    legend: {
      orient: 'vertical',
      type: 'scroll',
      left: 'left',
      // formatter: param => `${this.getAssayTypeDesc(param)} (${param})`
    },
    series: [{
      name: 'Activity type',
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
    console.log(`activity type pie init`);
    let restUrl = `chembl/activities/?filter{assay.tid}=${this.tid}`;
    if (this.molregno !== undefined) {
      restUrl = `chembl/activities/?filter{molregno}=${this.molregno}`;
    }
    this.rest.getDataList(
      restUrl,
      0,
      99999999,
      '',
      this.includeParams
    ).subscribe(
      data => {
        this.activityList = data['activities'];
        // init chart
        this.updateData();
      },
      () => {
        this.echart.hideLoading();
      }
    );
  }

  onChartInit(ec) {
    this.echart = ec;
    this.echart.showLoading();
  }

  updateData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    if (this.activityList === undefined) {
      return;
    }
    const pieData = [];
    forEach(
      countBy(this.activityList, (el: Activity) => el.standard_type),
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

  onDbClick(event) {
    console.log(event);
    // clicked assay type event.data.name
    this.globalService.gotoActivityList(ActivityListParamType.mix, {
      activity_type: event.data.name,
      tid: this.tid,
      molregno: this.molregno
    });
  }

}
