import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {ProteinClassification} from '../../../chembl/models/protein-classification';
import {JstreeModel} from '../../../layout/models/jstree-model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {filter} from 'rxjs/operators';
import {GlobalService} from '../../../services/global/global.service';
import {TargetsListParamType} from '../../../phin/targets-list-param-type.enum';
declare const $: any;

@Component({
  selector: 'app-jstree',
  templateUrl: './jstree.component.html',
  styleUrls: ['./jstree.component.css']
})
export class JstreeComponent implements OnInit, AfterViewInit {
  @Input() elementId: string;
  @Input() treeData: any[];
  applet;

  constructor(private rest: RestService,
              private globalService: GlobalService
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // todo: move rest work out
    this.rest.getDataList(
      'chembl/protein-classifications/?', 0, 99999)
      .subscribe(data => {
        data = data['protein_classifications'];
        this.treeData = data.map(
          jsonData => {
            const proteinClass: ProteinClassification = {};
            Object.assign(proteinClass, jsonData);
            if (proteinClass.parent_id === 0) {
              proteinClass.parent_id = '#';
            }
            return new JstreeModel(
              proteinClass.protein_class_id,
              proteinClass.parent_id,
              proteinClass.short_name
            );
          });
        // init jstree
        this.treeData.shift();
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
            console.log(classNode.node.id);
            this.gotoTargetList(classNode.node.id);
          }
        );
      });

  }
  gotoTargetList(proteinClassId: number): void {
    this.globalService.gotoTargetList(TargetsListParamType.proteinClass, proteinClassId);

  }

}
