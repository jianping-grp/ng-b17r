import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TargetInteraction} from '../../../../phin/models/target-interaction';
import {RestService} from '../../../../services/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {TargetDictionary} from '../../../../chembl/models/target-dictionary';

@Component({
  selector: 'app-target-network',
  templateUrl: './target-network.component.html',
  styleUrls: ['./target-network.component.css']
})
export class TargetNetworkComponent implements OnInit {

  private tid: number;
  targetDictionary: TargetDictionary;
  chartStyle: any;

  targetInteractions: TargetInteraction[] | null;

  constructor(private rest: RestService,
              private route: ActivatedRoute) {
    this.chartStyle = {
      'height': '800px'
    };
  }

  // network
  chartOption: any;
  target_types: any = {
    'ADMET': '#DB8275',
    'CELL-LINE': '#FFD700',
    'CHIMERIC PROTEIN': '#FFC0CB',
    'LIPID': '#FFA500',
    'MACROMOLECULE': '#FF69B4',
    'METAL': '#F0FFFF',
    'MOLECULAR': '#DEB887',
    'NO TARGET': '#99FFFF',
    'NON-MOLECULAR': '#9999FF',
    'NUCLEIC-ACID': '#9900FF',
    'OLIGOSACCHARIDE': '#6699FF',
    'ORGANISM': '#66CCCC',
    'PHENOTYPE': '#920092',
    'PROTEIN': '#546570',
    'PROTEIN COMPLEX': '#000066',
    'PROTEIN COMPLEX GROUP': '#0000FF',
    'PROTEIN FAMILY': '#006600',
    'PROTEIN NUCLEIC-ACID COMPLEX': '#00FF99',
    'PROTEIN-PROTEIN INTERACTION': '#00BFFF',
    'SELECTIVITY GROUP': '#999900',
    'SINGLE PROTEIN': '#D2691E',
    'SMALL MOLECULE': '#660000',
    'SUBCELLULAR': '#33FF00',
    'TISSUE': '#696969',
    'UNCHECKED': '#6A5ACD',
    'UNDEFINED': '#808000',
    'UNKNOWN': '#B0C4DE'
  };
  target_network_len: number;
  target_network_arr: any[] = [];

  ngOnInit() {
    console.log('target network init');
    this.route.parent.paramMap.subscribe(
      (params: ParamMap) => {
        const tid = +(params.get('tid'));
        // const tid = 120;
        this.tid = tid;
        console.log('tid:', this.tid)
        // this.restUrl = `chembl/activities/?filter{assay.tid}=${tid}${this.includeParam}`

        // fetch target-network for a tid
        this.rest.getDataList(
          `phin/target-network/${tid}/`,
          0,
          99999999).subscribe(data => {
          if (data.length > 0) {
            this.target_network_arr = data;
            this.target_network_len = data.length;
            let legend_data = [];
            let category_data = [];
            const nodes: any[] = [];
            const links: any[] = [];
            let num = 0;
            const targetName = data[0].first_target.target_id === tid ? data[0].first_target.tid.pref_name : data[0].second_target.tid.pref_name;
            const target_type = data[0].first_target.target_id === tid ? data[0].first_target.tid.target_type : data[0].second_target.tid.target_type;
            const target_type_color: string = this.target_types[target_type] ? this.target_types[target_type] : 'red';
            // 两个对应图例的数据（包括name和color）;
            legend_data.push(target_type);
            category_data.push({name: target_type, itemStyle: {normal: {color: target_type_color}}});
            // source target node
            nodes.push({
              category: 0,
              name: targetName,
              value: tid,
              id: 0,
              symbolSize: 25,
              itemStyle: {
                normal: {
                  color: target_type_color,
                }
              },
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              }
            });

            data.forEach((value, index) => {
              const fir_tid: number = value ? value.first_target.target_id : null;
              const sec_tid: number = value ? value.second_target.target_id : null;
              // 两个对应图例的数据（包括name和color）;
              const target_type: string = fir_tid === tid ? value.second_target.tid.target_type : value.first_target.tid.target_type;
              const target_type_color: string = this.target_types[target_type] ? this.target_types[target_type] : 'red';
              legend_data.push(target_type);
              category_data.push({name: target_type, itemStyle: {normal: {color: target_type_color}}});

              nodes.push({
                category: 0,
                name: fir_tid === tid ? value.second_target.tid.pref_name : value.first_target.tid.pref_name,
                // value为target id;
                value: fir_tid === tid ? sec_tid : fir_tid,
                id: index + 1,
                itemStyle: {
                  normal: {
                    color: target_type_color,
                  }
                },
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                }
              });
              links.push({
                  id: index,
                  source: 0,
                  target: ++num,
                  // value 为 activity_list 的长度
                  value: value.activity_list.length,
                  // symbolSize为两端的id数组
                  symbolSize: [tid, fir_tid === tid ? sec_tid : fir_tid],
                  lineStyle: {
                    normal: {
                      width: (value.activity_list.length === 1 ? 0.2 : Math.log(value.activity_list.length)) * 2
                    }
                  }
                }
              );
            });
            legend_data = this.quchong(legend_data);
            category_data = this.quchong(category_data, 'name');

            this.chartOption = {
              legend: {
                data: legend_data,
                left: 'left',
                orient: 'vertical',
                itemHeight: 10,
                itemGap: 5,
                selectedMode: false
              },
              animationDurationUpdate: 1500,
              animationEasingUpdate: 'quinticInOut',
              tooltip: {
                show: true,
                formatter: (params) => {
                  switch (params.dataType) {
                    case 'node':
                      return params.name;
                    case 'edge':
                      return `shared active compounds number: ${params.value}`;
                  }
                }
              },
              series: [{
                type: 'graph',
                layout: 'force',
                focusNodeAdjacency: true,
                data: nodes,
                links: links,
                categories: category_data,
                roam: true,
                draggable: false,
                force: {
                  repulsion: 60,
                  gravity: 0.1,
                  edgeLength: [50, 150],
                  layoutAnimation: true,
                }
              }]
            };
          }

        });

      }
    );
    // this.getInteractionData();
  }

  // 数组去重
  quchong(arr: any[], item?: string) {
    const len = arr.length - 1;
    const dict = {};
    const res = [];
    if (typeof arr[0] === 'object') {
      for (let i = len; i >= 0; i--) {
        if (!dict[arr[i][item]]) {
          res.push(arr[i]);
          dict[arr[i][item]] = true;
        }
      }
    } else {
      for (let i = len; i >= 0; i--) {
        if (!dict[arr[i]]) {
          res.push(arr[i]);
          dict[arr[i]] = true;
        }
      }
    }
    return res;
  }

  activity_property_change(count: string | number, val: string | number, chembl_name: string, category: string, name_display: string) {
    const data = this.target_network_arr;
    let legend_data = [];
    let category_data = [];

    const nodes: any[] = [];
    const links: any[] = [];
    let num = 0;
    let flag = false;
    const targetName = data[0].first_target.target_id === this.tid ? data[0].first_target.tid[chembl_name] : data[0].second_target.tid[chembl_name];

    const target_category = data[0].first_target.target_id === this.tid ? data[0].first_target.tid[category] : data[0].second_target.tid[category];
    const target_type_color: string = this.target_types[target_category] ? this.target_types[target_category] : 'red';
// 点击图例对应的消失
    // 两个对应图例的数据（包括name和color）;
    legend_data.push(target_category);
    category_data.push({name: target_category, itemStyle: {normal: {color: target_type_color}}});
    nodes.push({
      category: 0,
      name: targetName,
      value: this.tid,
      id: 0,
      symbolSize: 25,
      itemStyle: {
        normal: {
          color: target_type_color,
        }
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      }
    });
    data.forEach((value, index) => {

      flag = false;
      const temp_arr = value.activity_list;
      const len = temp_arr.length;
      if (len >= (+count)) {
        // let activity_list = Object.assign([], value.activity_list);
        const activity_list = [];
        for (let i = 0; i < len; i++) {
          if (+(temp_arr[i]) >= +(val)) {
            activity_list.push(temp_arr[i]);
            flag = true;
          }
        }

        if (flag) {
          const fir_tid: number = value ? value.first_target.target_id : null;
          const sec_tid: number = value ? value.second_target.target_id : null;
          // 两个对应图例的数据（包括name和color）;
          const target_category: string = fir_tid === this.tid ? value.second_target.tid[category] : value.first_target.tid[category];
          const target_category_color: string = this.target_types[target_category] ? this.target_types[target_category] : 'red';
          legend_data.push(target_category);
          category_data.push({name: target_category, itemStyle: {normal: {color: target_category_color}}});

          nodes.push({
            category: 0,
            name: fir_tid === this.tid ? value.second_target.tid[chembl_name] : value.first_target.tid[chembl_name],
            // value为target id;
            value: fir_tid === this.tid ? sec_tid : fir_tid,
            id: index + 1,
            itemStyle: {
              normal: {
                color: target_category_color,
              }
            },
            label: {
              normal: {
                show: Boolean(+(name_display))
              },
              emphasis: {
                show: false
              }
            }
          });
          links.push({
              id: index,
              source: 0,
              target: ++num,
              // value 为 activity_list 的长度
              value: value.activity_list.length,
              // symbolSize为两端的id数组
              symbolSize: [this.tid, fir_tid === this.tid ? sec_tid : fir_tid],
              lineStyle: {
                normal: {
                  width: (value.activity_list.length === 1 ? 0.2 : Math.log(value.activity_list.length)) * 2
                }
              }
            }
          );
        }

      }
    });
    legend_data = this.quchong(legend_data);
    category_data = this.quchong(category_data, 'name');
    this.chartOption = {
      legend: {
        data: legend_data,
        left: 'left',
        orient: 'vertical',
        itemHeight: 10,
        itemGap: 5,
        selectedMode: false
      },
      tooltip: {
        show: true,
        formatter: (params) => {
          switch (params.dataType) {
            case 'node':
              return params.name;
            case 'edge':
              return `shared active compounds number: ${params.value}`;
          }
        }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        focusNodeAdjacency: true,
        data: nodes,
        links: links,
        categories: category_data,
        roam: true,
      }]
    };
  }

  chartClick(param) {
    const type = param.dataType;
    switch (type) {
      case 'node':
        console.log('node id:', param.value);
        break;
      case 'edge':
        console.log('edge id:', param.data.symbolSize[0], '--', param.data.symbolSize[1])
        break;
    }
  }
}
