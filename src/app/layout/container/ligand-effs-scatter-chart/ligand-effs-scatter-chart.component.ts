import {Component, Input, OnInit} from '@angular/core';
import {LigandEff} from '../../../chembl/models/ligand-eff';
import {Activity} from '../../../chembl/models/activity';
import {GlobalService} from '../../../services/global/global.service';
import {RestService} from '../../../services/rest/rest.service';
import {keyBy, merge, groupBy, forEach} from 'lodash';
import {MatDialog} from '@angular/material';
import {CompoundCardComponent} from '../../../shared/chembl-explorer/compound-card/compound-card.component';

@Component({
  selector: 'app-ligand-effs-scatter-chart',
  templateUrl: './ligand-effs-scatter-chart.component.html',
  styleUrls: ['./ligand-effs-scatter-chart.component.css']
})
export class LigandEffsScatterChartComponent implements OnInit {
  @Input() tid: number;
  includeParam = '&include[]=ligandeff.&exclude[]=*' +
    '&include[]=pchembl_value&include[]=molregno&include[]=standard_type';
  ligandEffList: LigandEff[];
  activityList: Activity[];
  echart: any;
  propertyList = ['sei', 'lle', 'bei', 'le'];
  xProp = 'sei';
  yProp = 'bei';
  nodeColor = {
    high: '#267f13',
    median: '#8ADE17',
    normal: '#DE8D04',
    low: '#b0063f'
  };
  echartOptions = {
    legend: {
      data: [
        'pChEMBL value<=6', '6<pChEMBL value<=7',
        '7<pChEMBL value<=9', 'pChEMBL value>9'
      ]
    },
    dataZoom: [{
      show: true
    }],
    tooltip: {
      formatter: (params) => {
        return `Compound (click to view more):</br>${this.xProp.toUpperCase()}: ${params.value[0]}, ` +
          `${this.yProp.toUpperCase()}: ${params.value[1]}, pChEMBL value: ${params.value[2]}`;
      }
    },
    xAxis: {
      name: 'Surface Efficiency Index (SEI)',
      nameLocation: 'center',
      nameGap: 35,
      type: 'value',
      // interval:size,
    },
    yAxis: {
      name: 'Binding Efficiency Index (BEI)',
      nameLocation: 'center',
      nameGap: 35,
      nameRotate: 90,
      type: 'value',
    },
    series: [{
      type: 'scatter',
      name: 'Compound',
      coordinateSystem: 'cartesian2d'
    }]
  };

  constructor(private globalService: GlobalService,
              private rest: RestService,
              public dialog: MatDialog) {
  }

  getNodeColor(value: string | number) {
    value = +(value);
    if (value >= 9) {
      return this.nodeColor.high;
    }
    if (value >= 7) {
      return this.nodeColor.median;
    }
    if (value >= 6) {
      return this.nodeColor.normal;
    } else {
      return this.nodeColor.low;
    }
  }

  ngOnInit() {
    console.log('ligand eff chart init');
  }

  onChartInit(ec) {
    console.log(`document line chart init`);
    this.echart = ec;
    this.echart.showLoading();
    const restUrl = `chembl/activities/?filter{assay.tid}=${this.tid}`;
    this.rest.getDataList(
      restUrl,
      0,
      99999999,
      '',
      this.includeParam
    ).subscribe(
      data => {
        this.activityList = data['activities']
          .filter(el => el.ligandeff !== null && el.pchembl_value !== null);
        this.ligandEffList = data['ligand_effs'];
        // init chart
        this.updateData();
      }
    );
  }

  updateData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    const activateList = keyBy(this.activityList, 'ligandeff');
    merge(activateList, keyBy(this.ligandEffList, 'activity'));
    const actData = this.activityList.map(el => {
      // const elData = values(el);
      return [
        el[this.xProp], el[this.yProp], el['pchembl_value'],
        el['molregno'], el['standard_type']
      ];
    });
    const seriesData = [];
    forEach(groupBy(actData, el => {
      if (el[2] <= 6) {
        return 'pChEMBL value<=6';
      } else if (el[2] <= 7) {
        return '6<pChEMBL value<=7';
      } else if (el[2] <= 9) {
        return '7<pChEMBL value<=9';
      } else {
        return 'pChEMBL value>9';
      }
    }), (v, k) => {
      seriesData.push({
        name: k,
        type: 'scatter',
        data: v
      });
    });
    this.echart.setOption({
      series: seriesData,
      xAxis: {
        name: this.getAxisTitle(this.xProp)
      },
      yAxis: {
        name: this.getAxisTitle(this.yProp)
      }
    });
    this.echart.hideLoading();
  }

  getAxisTitle(prop) {
    switch (prop) {
      case 'sei':
        return 'Surface Efficiency Index (SEI)';
      case 'bei':
        return 'Binding Efficiency Index (BEI)';
      case 'le':
        return 'Ligand Efficiency (LE)';
      case 'lle':
        return 'Lipophilic Ligand efficiency (LLE)';
      default:
        return 'no title available';
    }
  }

  onClick(event) {
    console.log(event);
    const molregno = event.value[3];
    this.openCompoundDialog(molregno);
  }

  openCompoundDialog(molregno: number): void {
    this.dialog.open(
      CompoundCardComponent, {
        width: '400px',
        data: {
          molregno: molregno
        }
      }
    );
  }
}
