import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JstreeModel} from '../../../layout/models/jstree-model';
import {filter} from 'rxjs/operators';
import {RestService} from '../../../services/rest/rest.service';
import {KeggDiseaseClass} from '../../../phin/models/kegg-disease-class';
import {GlobalService} from '../../../services/global/global.service';
import {TargetsListParamType} from '../../../phin/targets-list-param-type.enum';
declare const $: any;

@Component({
  selector: 'app-jstree-kegg-disease',
  templateUrl: './jstree-kegg-disease.component.html',
  styleUrls: ['./jstree-kegg-disease.component.css']
})
export class JstreeKeggDiseaseComponent implements OnInit, AfterViewInit {
  @Input() elementId: string;
  @Input() treeData: any;
  applet;
  constructor(
    private rest: RestService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.rest.getDataList(
      'phin/kegg-disease-classes/?', 0, 99999)
      .subscribe(data => {
        data = data['kegg_disease_classes'];
        this.treeData = data
          .filter(el => {
            return el.mapping_counts > 0;
          })
          .map(
          jsonData => {
            if (jsonData.parent === null) {
              jsonData.parent = '#';
            }
            const keggDiseaseClass: KeggDiseaseClass = {};
            Object.assign(keggDiseaseClass, jsonData);
            return new JstreeModel(
              keggDiseaseClass.id,
              keggDiseaseClass.parent,
              `${keggDiseaseClass.kegg_id} ${keggDiseaseClass.name}`
            );
          });
        // init jstree
        this.applet = $(`#${this.elementId}`).jstree({
          core: {data: this.treeData}
        });
        const select$ = Observable.create(obs => {
          this.applet.on('changed.jstree', function(e, selectedNode) {
            obs.next(selectedNode);
          });
        });
        select$.pipe(
          filter(classNode => {
            if (classNode['node']) {
              return classNode['node']['children'].length === 0;
            }
            return false;
          })
        )
          .subscribe(
            classNode => {
              // console.log(classNode.node.id);
              this.globalService.gotoTargetList(TargetsListParamType.keggDisease, classNode.node.id);
            }
          );
      });
  }

}
