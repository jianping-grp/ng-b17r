import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {GlobalService} from '../../../services/global/global.service';
import {countBy, forEach, sortBy} from 'lodash';
import {Doc} from '../../../chembl/models/doc';
import {DocListParamType} from '../../../phin/doc-list-param-type.enum';

@Component({
  selector: 'app-document-time-line-chart',
  templateUrl: './document-time-line-chart.component.html',
  styleUrls: ['./document-time-line-chart.component.css']
})
export class DocumentTimeLineChartComponent implements OnInit {

  @Input() tid: number;
  @Input() molregno: number;
  docList: Doc[];
  includeParam = '&exclude[]=*&include[]=year';
  echart;
  initOptions = {
    dataZoom: [],
    tooltip: {},
    xAxis: {},
    yAxis: {},
    series: []
  };

  constructor(private globalService: GlobalService,
              private rest: RestService) {
  }

  ngOnInit() {

  }

  onChartInit(ec) {
    // console.log(`document line chart init`);
    this.echart = ec;
    this.echart.showLoading();
    let restUrl = `chembl/docs/?filter{assays_set.tid}=${this.tid}`;
    if (this.molregno !== undefined) {
      restUrl = `chembl/docs/?filter{assays_set.activities_set.molregno}=${this.molregno}`;
    }
    this.rest.getDataList(
      restUrl,
      0,
      99999999,
      '',
      this.includeParam
    ).subscribe(
      data => {
        this.docList = data['docs'].filter(el => el['year'] !== null);
        // init chart
        this.updateData();
      }
    );
  }

  updateData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    if (this.docList === undefined) {
      return;
    }
    let yearCountList = [];
    forEach(
      countBy(this.docList, (el: Doc) => el.year),
      (v, k) => {
        yearCountList.push({year: k, counts: v});
      }
    );
    yearCountList = sortBy(yearCountList, 'year');
    const xaxis = yearCountList.map(el => el.year);
    const counts = yearCountList.map(el => el.counts);
    this.initOptions = {
      dataZoom: [
        {
          show: true,
          height: 30
        }
      ],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: 'Year',
        nameLocation: 'center',
        nameGap: 30,
        data: xaxis
      },
      yAxis: {
        minInterval: 1,
        name: 'No. of publications',
        nameLocation: 'center',
        nameGap: 30,
        nameRotate: 90
      },
      series: [
        {
          type: 'line',
          data: counts
        }
      ]
    };
    this.echart.hideLoading();
  }

  onDbClick(event) {
    // console.log(event);
    // clicked assay type event.data.name
    if (this.molregno !== undefined) { // molregno
      this.globalService.gotoDocList(DocListParamType.molregno_year, {
        year: event.name,
        molregno: this.molregno
      });
    } else { // tid
      this.globalService.gotoDocList(DocListParamType.tid_year, {
        year: event.name,
        tid: this.tid
      });
    }
  }

}
