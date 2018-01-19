import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../../services/rest/rest.service";
import {MatDialog} from "@angular/material";
import {CompoundCardComponent} from "../../../shared/chembl-explorer/compound-card/compound-card.component";

@Component({
  selector: 'app-graph-scatter-ligand',
  templateUrl: './graph-scatter-ligand.component.html',
  styleUrls: ['./graph-scatter-ligand.component.css']
})
export class GraphScatterLigandComponent implements OnInit {
  @Input() private tid: number;

  chartOption: any;
  ligand_effs_len: number;

  constructor(private rest: RestService,
              private dialog: MatDialog,) {
  }

  ngOnInit() {
    this.rest.getDataList(
      `chembl/ligand-effs/?filter{activity.assay.tid}=${this.tid}&exclude[]=le` +
      `&exclude[]=activity.*&include[]=activity.standard_value&include[]=activity.activity_id` +
      `&exclude[]=activity.molregno.*&include[]=activity.molregno.chembl&include[]=activity.molregno.molregno`,
      0,
      99999999).subscribe(data => {
      const res_ligand = data['ligand_effs'];
      const res_activities = data['activities'];
      const res_molecules = data['molecule_dictionaries'];
      this.ligand_effs_len = data.meta.total_results;

      if (!this.chartOption && this.ligand_effs_len > 0) {

        const ligand_effs_arr = this.ligand_handle_to_arr(res_molecules, res_activities, res_ligand, this.ligand_effs_len);

        this.chartOption = {
          "tooltip": {
            "formatter": (params) => {
              const arr = params.value;
              const fir = (+arr[0]).toString(),
                sec = (+arr[0]).toString();
              const name = params.name.split('-')[0];
              return 'Compound:' + name + '</br>' + 'SEI: ' + fir + ',' + 'BEI: ' + sec;
            }
          },
          xAxis: {
            name: 'Surface Efficiency Index (SEI)',
            nameLocation: 'center',
            nameGap: 35,
            type: 'value',
            // interval:size,
            max: (value) => {
              return Math.ceil(value.max + 1)
            },
            min: (value) => {
              return Math.floor(value.min - 1)
            }
          },
          yAxis: {
            name: 'Binding Efficiency Index (BEI)',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 90,
            type: 'value',
            min: 0
          },
          series: [{
            type: 'scatter',
            name: 'Compound',
            coordinateSystem: 'cartesian2d',
            data: ligand_effs_arr
          }]
        }
      }

    });

  }

  chartClick(param) {
    const molId = param.name.split('-')[1];
    const molName = param.name.split('-')[0];
    this.rest.getData(`chembl/compound-structures/${molId}/?exclude[]=*&include[]=canonical_smiles&include[]=molregno`)
      .subscribe(data => {
        const smile = data['compound_structures'].canonical_smiles;
        const molregno = data['compound_structures'].molregno;
        this.openDialog(smile, molName, molregno);
      })
  }

  openDialog(smile: string, name: string, molregno: number): void {
    let dialogRef = this.dialog.open(CompoundCardComponent, {
      width: '250px',
      height: '300px',
      data: {smile: smile, chembl_name: name, molregno: molregno}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The compound-card was closed:');
    })
  }

  ligand_handle_to_arr(molecules: any[], activities: any[], ligands: any[], len: number) {
    let res: any[] = [];
    let temp_dict1 = {}; // 关于molregno和chembl的key-value对。
    for (let p = molecules.length - 1; p >= 0; p--) {
      const mol_id = +(molecules[p].molregno);
      const chembl_val = molecules[p].chembl;
      if (!temp_dict1[mol_id]) {
        temp_dict1[mol_id] = chembl_val;
      }
    }
    let temp_dict2 = {}; // 关于activity和standard_value的key-value对。
    for (let j = len - 1; j >= 0; j--) {
      const sta_val = +(activities[j].standard_value);
      const act_id = activities[j].activity_id;
      const mol_id = activities[j].molregno;

      if (sta_val < 1) {
        temp_dict2[act_id] = {color: '#2f4554', chembl: temp_dict1[mol_id], mol: mol_id};
      }
      if (sta_val >= 1 && sta_val < 100) {
        temp_dict2[act_id] = {color: '#8ADE17', chembl: temp_dict1[mol_id], mol: mol_id};
      }
      if (sta_val >= 100 && sta_val < 1000) {
        temp_dict2[act_id] = {color: '#DE8D04', chembl: temp_dict1[mol_id], mol: mol_id};
      }
      if (sta_val >= 1000) {
        temp_dict2[act_id] = {color: '#07EAE9', chembl: temp_dict1[mol_id], mol: mol_id};
      }
    }
    for (let i = len - 1; i >= 0; i--) {
      const sei = ligands[i].sei;
      const bei = ligands[i].bei;
      res.push({
        name: temp_dict2[ligands[i].activity]['chembl'] + '-' + temp_dict2[ligands[i].activity]['mol'],
        value: [sei, bei],
        itemStyle: {
          normal: {
            color: temp_dict2[ligands[i].activity]['color']
          },
          emphasis: {
            color: '#EA061D'
          }
        }
      });
    }
    return res;
  }


}
