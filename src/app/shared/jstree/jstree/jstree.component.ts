import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {ProteinClassification} from '../../../chembl/models/protein-classification';
import {JstreeModel} from '../../../layout/models/jstree-model';

declare const $: any;

declare function jsmeOnLoad(): any;

@Component({
  selector: 'app-jstree',
  templateUrl: './jstree.component.html',
  styleUrls: ['./jstree.component.css']
})
export class JstreeComponent implements OnInit, AfterViewInit {
  @Input() elementId: string;
  @Input() treeData: any[];
  applet;
  private _demoData = [
    {"id": 1, "parent": '#', "text": "Simple root node"},
    {"id": 2, "parent": '#', "text": "Root node 2"},
    {"id": 3, "parent": 2, "text": "Child 1"},
    {"id": 4, "parent": 2, "text": "Child 2"},
  ]


  constructor(private rest: RestService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // todo: move rest work out
    this.rest.getDataList(
      'chembl/protein-classifications/?', 0, 99999)
      .subscribe(data => {
        data = data['protein_classifications']
        this.treeData = data.map(
          jsonData => {
            let proteinClass = new ProteinClassification();
            Object.assign(proteinClass, jsonData);
            return new JstreeModel(
              proteinClass.protein_class_id,
              proteinClass.parent_id,
              proteinClass.short_name
            );
          });
        // init jstree
        this.treeData[0].parent = '#'
        this.applet = $(`#${this.elementId}`).jstree({
          core: {data: this.treeData}
        });
      })

  }

}
