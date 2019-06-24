import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../services/global/global.service';
import {RestService} from '../../../services/rest/rest.service';
import {CompoundProperties} from '../../../chembl/models/compound-properties';
import {countBy, forEach, merge, partition, keyBy, keys, assign, mapValues, values} from 'lodash';
import {Activity} from '../../../chembl/models/activity';
import {ActivityListParamType} from '../../../phin/activity-list-param-type.enum';

@Component({
  selector: 'app-molecule-property-bar-chart',
  templateUrl: './molecule-property-bar-chart.component.html',
  styleUrls: ['./molecule-property-bar-chart.component.css']
})
export class MoleculePropertyBarChartComponent implements OnInit {
  @Input() tid: number;
  @Input() assayId: number;
  @Input() docId: number;
  showActivity = true;
  echart: any;
  compoundPropertyList: CompoundProperties [];
  activityList: Activity[];
  propertyList = [
    {name: 'full_mwt', bin: 20, displayedName: 'Molecular weight'},
    {name: 'psa', bin: 10, displayedName: 'PSA'},
    {name: 'alogp', bin: 1, displayedName: 'ALogP'},
    {name: 'heavy_atoms', bin: 5, displayedName: 'Heavy atoms'},
    {name: 'aromatic_rings', bin: 1, displayedName: 'Aromatic rings'},
    {name: 'rtb', bin: 1, displayedName: 'RTB'},
    {name: 'hbd', bin: 1, displayedName: 'HBD'},
    {name: 'hba', bin: 1, displayedName: 'HBA'},
  ];
  propertyName = this.propertyList[0].name;
  binSize = this.propertyList[0].bin;
  activityThreshold = 5; // pchembl_value threshold of activate of inactivate molecule
  chartOptions = {
    legend: {
      data: ['active molecules', 'inactive molecules']
    },
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        nameLocation: 'center',
        nameGap: 30,
      }
    ],
    yAxis: [
      {
        name: 'Number of compounds',
        nameLocation: 'center',
        nameGap: 35,
        nameRotate: 90,
        type: 'value'
      }
    ],
    series: [
      {
        name: 'molecule property',
        type: 'bar',
        barWidth: '75%',
      }
    ],
    dataZoom: {
      show: true,
      height: 30,
      bottom: 0,
    }
  };


  constructor(private route: ActivatedRoute,
              private globalService: GlobalService,
              private rest: RestService) {
  }

  ngOnInit() {
  }

  getData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    let restUrl = '';
    let includeParams = '';
    if (this.showActivity) { // include activity data if showActivity is true
      restUrl = `chembl/activities/?filter{assay.tid}=${this.tid}`;
      includeParams = `&include[]=molregno.compoundproperties.${this.propertyName}` +
        `&exclude[]=molregno.*&exclude[]=molregno.compoundproperties.*` +
        `&include[]=molregno.compoundproperties.molregno&exclude[]=*&include[]=pchembl_value`;
    } else { // fetch molecule property only
      includeParams = '&exclude[]=*';
      restUrl = `chembl/compound-properties/?filter{molregno.activities_set.assay.tid}=${this.tid}`;
      if (this.assayId !== undefined) {
        restUrl = `chembl/compound-properties/?filter{molregno.activities_set.assay}=${this.assayId}`;
      }
      includeParams += `&include[]=${this.propertyName}`;
    }
    this.rest.getDataList(
      restUrl, 0, 9999999, '', includeParams
    )
      .subscribe(
        data => {
          if (data['compound_properties'] === undefined) {
            return;
          }
          this.compoundPropertyList = data['compound_properties'].filter(
            el => el[this.propertyName] !== null
          );
          this.activityList = data['activities'];
          this.updateData();
        },
        err => {
          // todo error
          this.echart.hideLoading();
        }
      );
  }

  onChartInit(ec) {
    this.echart = ec;
    this.echart.showLoading();
    this.getData();
  }

  dataListToSeries(dataList): any[] {
    const histData = [];
    forEach(countBy(dataList, el => Math.floor(el / this.binSize)),
      (v, k) => {
        histData.push(
          {
            x: `${ this.binSize * parseFloat(k) }-${this.binSize * (1 + parseFloat(k))}`,
            counts: v
          }
        );
      });
    return histData;
  }

  activityDataListTOSeries(dataList) {
    const binDict = countBy(dataList, el => Math.round(el[this.propertyName] / this.binSize));
    const inactivateData = mapValues(binDict, () => 0);
    const activateData = mapValues(binDict, () => 0);
    const partedData = partition(dataList, el => el['pchembl_value'] >= this.activityThreshold);
    const activateBin = countBy(partedData[0], el => Math.floor(el[this.propertyName] / this.binSize));
    const inactivateBin = countBy(partedData[1], el => Math.floor(el[this.propertyName] / this.binSize));
    assign(activateData, activateBin);
    assign(inactivateData, inactivateBin);
    return {
      x: keys(binDict)
        .map(el => `${this.binSize * parseFloat(el)}`),
      inactivateSeries: values(inactivateData),
      activateSeries: values(activateData)
    };
  }

  updateData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    if (this.compoundPropertyList === undefined) {
      return;
    }
    if (!this.showActivity) {
      const propList = this.compoundPropertyList.map(el => el[this.propertyName]);
      const seriesData = this.dataListToSeries(propList);
      this.echart.setOption({
        xAxis: [{
          data: seriesData.map(el => el.x)
        }],
        series: [{
          data: seriesData.map(el => el.counts)
        }]
      });
    } else { // show activity
      merge(
        keyBy(this.compoundPropertyList, 'molregno'),
        keyBy(this.activityList, 'molregno')
      );
      const binData = this.activityDataListTOSeries(this.compoundPropertyList);
      this.echart.setOption(
        {
          xAxis: [{
            type: 'category',
            nameLocation: 'center',
            nameGap: 30,
            name: 'xxxxxxxxxxxxxxx',
            data: binData.x
          }],
          series: [
            {
              name: 'inactive molecules',
              type: 'bar',
              stack: 'total',
              itemStyle: {
                normal: {
                  color: '#3c6793',
                  label: {
                    show: true,
                  },
                  position: 'insideTop'
                }
              },
              data: binData.inactivateSeries
            },
            {
              name: 'active molecules',
              type: 'bar',
              stack: 'total',
              itemStyle: {
                normal: {
                  color: '#198551',
                  label: {
                    show: true,
                  },
                  position: 'insideTop'
                }
              },
              data: binData.activateSeries
            }
          ]
        }
      );
    }
    this.echart.hideLoading();
  }

  onDbClick(event) {
    // console.log(event);
    this.globalService.gotoActivityList(ActivityListParamType.mix, {
      tid: this.tid,
      mol_prop_name: this.propertyName,
      prop_range: event.name
    });
  }

  onPropertyNameChange() {
    this.binSize = this.propertyList.find(el => el.name === this.propertyName).bin;
    this.getData();
  }

}
