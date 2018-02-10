import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PhinTarget} from '../../../../phin/models';
import {TargetNetwork} from '../../../../phin/models/target-network';
import {EchartsOptions} from '../../../../phin/models/echarts-options';
import {TargetDictionary} from '../../../../chembl/models/target-dictionary';
import {Subscription} from 'rxjs/Subscription';
import {GlobalService} from '../../../../services/global/global.service';
import {PhinActivityListParamType} from '../../../../phin/phin-activity-list-param-type.enum';

@Component({
  selector: 'app-target-network-graph',
  templateUrl: './target-network-graph.component.html',
  styleUrls: ['./target-network-graph.component.css']
})
export class TargetNetworkGraphComponent implements OnInit, AfterViewInit, OnDestroy {

  actValueType = 'mean'; // use mean max min or median activity value
  categoryType = 'target_type'; // legend type
  labelNameType = 'pref_name'; // node label name type target pref_name or chembl id
  showLabel = false; // show node label or not
  networkDataType = 'target_networks'; // structure or scaffold network
  options: EchartsOptions; // echart options
  series: any;
  categories: any;
  legend: any;
  targetList: PhinTarget[]; // full nodes data
  targetNetworkList: TargetNetwork[]; // full link data
  private tid: number; // current target tid
  private extraParams = '&include[]=first_target.*&include[]=second_target.*';
  activityThreshold = 0; // network activity threshold
  lengthThreshold = 1; // shared number of compounds threshold
  private echartNetwork; // network graph instance
  tidSubscription: Subscription;

  constructor(private rest: RestService,
              private globalService: GlobalService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  onChartInit(ec) {
    this.echartNetwork = ec;
    this.echartNetwork.showLoading();
  }

  ngOnInit() {
    // console.log('target network graph init');
    this.initNetworkOptions();
    this.tidSubscription = this.route.parent.paramMap.subscribe(
      (params: ParamMap) => {
        this.tid = +(params.get('tid'));
        // console.log(`${this.tid}`);
        this.getData();
      }
    );
  }

  ngOnDestroy() {
    this.tidSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    // console.log('network graph view init.');
  }

  private _setTitle(title: string) {
    this.echartNetwork.setOption(
      {
        title: {
          text: title
        }
      }
    );
  }

  private _getNetworkTypeName() {
    if (this.networkDataType === 'target_scaffold_networks') {
      return 'scaffold';
    }
    return 'structure';
  }

  private _setDefaultParams() {
    // set default network params for performance issue
    const targetCounts = this.targetList.length;
    if (targetCounts >= 500) {
      this.activityThreshold = 6;
      this.lengthThreshold = 20;
    } else if (targetCounts >= 200) {
      this.activityThreshold = 5;
      this.lengthThreshold = 10;
    } else if (targetCounts >= 50) {
      this.activityThreshold = 5;
      this.lengthThreshold = 5;
    }
  }

  getData() { // rest data ---> this.targetList, targetNetworkList
    if (this.echartNetwork !== undefined) {
      this.echartNetwork.showLoading();
    }
    let restUrl = `phin/target-network/target/?exclude[]=molecule&tid=`;
    if (this.networkDataType === 'target_scaffold_networks') {
      restUrl = `phin/target-scaffold-network/target/?exclude[]=scaffold&tid=`;
    }
    this.rest.getDataList(
      `${restUrl}${this.tid}` +
      `${this.extraParams}`,
      0,
      99999
    ).subscribe(data => {
      this.targetList = data['targets'];
      this.targetNetworkList = data[this.networkDataType];
      //
      if (this.targetList === undefined) {
        this.echartNetwork.hideLoading();
        this._setTitle('No network data available for this target.');
      } else {
        this._setDefaultParams();
        // init network
        this.updateNetworkData();
      }
    });
  }

  initNetworkOptions() {
    this.series = {
      type: 'graph',
      layout: 'force',
      focusNodeAdjacency: true,
      roam: true,
      symbolSize: 20,
      nodes: [],
      links: [],
      label: {
        normal: {
          show: this.showLabel,
          formatter: (el) => {
            return el.data[this.labelNameType];
          }
        }
      },
      force: {
        repulsion: 650,
        gravity: 0.1,
        edgeLength: [50, 150],
      },
      lineStyle: {
        normal: {
          width: 6,
          type: 'solid',
        }
      }
    };
    this.options = {
      title: {
        top: 'bottom',
        left: 'center',
        textStyle: {
          color: '#b2b2b2'
        }
      },
      tooltip: {
        show: true,
        formatter: (el) => {
          switch (el.dataType) {
            case 'node':
              return `Target name: ${el.data.pref_name}(${el.data.chembl})</br>` +
                `Target type: ${el.data.target_type} </br>` +
                `Organism: ${el.data.organism}`;
            case 'edge':
              return `shared activate compounds number: ${el.value}`;
          }
        }
      },
      animationDuration: 3000,
      animationEasingUpdate: 'quinticInOut',
      series: [this.series],
    };
  }

  updateCategories() {
    this.categories = Array.from(new Set(this.series.nodes))
      .map(el => {
        return {name: el['category']};
      });
  }

  updateNetworkData() {
    if (this.targetList === undefined) {
      return;
    }
    if (this.echartNetwork !== undefined) {
      this.echartNetwork.showLoading();
    }
    // console.log(`network type: ${this.networkDataType}`);
    // console.log(`shown label: ${this.showLabel}`);
    // console.log(`activity threshold ${this.activityThreshold}`);
    // console.log(`length threshold: ${this.lengthThreshold}`);
    this.series['links'] = [];
    this.series['nodes'] = [];
    const nodeSet = new Set(); // hold current unique node set
    this.targetNetworkList.forEach(linkEl => {
      const filteredActList = linkEl[this.actValueType]
        .filter(actEL => actEL >= this.activityThreshold);
      if (filteredActList.length >= this.lengthThreshold) {
        nodeSet.add(linkEl.first_target.toString());
        nodeSet.add(linkEl.second_target.toString());
        this.series['links'].push(
          {
            source: linkEl.first_target.toString(),
            target: linkEl.second_target.toString(),
            value: filteredActList.length,
            lineStyle: {
              normal: {
                width: 1 + Math.log2(filteredActList.length)
              }
            }
          }
        );
      }
    });
    this.series['nodes'] = this.targetList
      .filter((targetEl: PhinTarget) => nodeSet.has(targetEl.target_id.toString()))
      .map((targetEl: PhinTarget) => {
        return {
          pref_name: (<TargetDictionary>targetEl.tid).pref_name,
          tid: (<TargetDictionary>targetEl.tid).tid,
          chembl: (<TargetDictionary>targetEl.tid).chembl,
          name: targetEl.target_id.toString(),
          organism: (<TargetDictionary>targetEl.tid).organism,
          target_type: (<TargetDictionary>targetEl.tid).target_type,
          category: targetEl.tid[this.categoryType],
        };
      });
    this.options['series'] = [this.series];
    this.updateCategories();
    this.series['categories'] = this.categories;
    this.options['legend'] = [{
      data: this.categories.map(el => el.name),
      left: 'left',
      orient: 'vertical',
      itemHeight: 10,
      itemGap: 5,
      selectedMode: true
    }];
    this.echartNetwork.setOption(this.options);
    this._setTitle(
      `Target interaction (in term of shared active ${this._getNetworkTypeName()} numbers) network.` +
      ` (displayed nodes ${this.series.nodes.length} of ${this.targetList.length})`
    );
    this.echartNetwork.hideLoading();
  }

  showNodeLabel() {
    this.series.label.normal.show = this.showLabel;
    this.options['series'] = [this.series];
    this.echartNetwork.setOption(this.options);
  }

  gotoNetworkDataTable() {
    let url = 'network-datatable/target-network-data';
    if (this.networkDataType === 'target_scaffold_networks') {
      url = 'network-datatable/target-scaffold-network-data';
    }
    this.router.navigate([url], {
      queryParams: {tid: this.tid}
    });
  }

  onDbClick(event) {
    // console.log(event);
    switch (event.dataType) {
      case 'node': {
        const selectedTid = event.data.tid;
        if (selectedTid === this.tid) {
          return;
        } // escape current target
        this.router.navigate(['targets', +(selectedTid)]);
        break;
      }
      case 'edge': {
        let url = 'network-datatable/phin-activities';
        if (this.networkDataType === 'target_scaffold_networks') {
          url = 'network-datatable/phin-scaffold-activities';
        }
        this.globalService.gotoPhinActivityList(PhinActivityListParamType.target_target, {
          first_target: event.data.source,
          second_target: event.data.target,
          top: event.data.value,
        });
      }
    }
  }
}
