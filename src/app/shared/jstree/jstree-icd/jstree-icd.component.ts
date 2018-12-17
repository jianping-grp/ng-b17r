import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {RestService} from "../../../services/rest/rest.service";
import {GlobalService} from "../../../services/global/global.service";
import {JstreeModel} from "../../../layout/models/jstree-model";
import {Observable} from "rxjs";
import {filter} from "rxjs/internal/operators";
import {TargetsListParamType} from "../../../phin/targets-list-param-type.enum";
declare const $: any;


@Component({
  selector: 'app-jstree-icd',
  templateUrl: './jstree-icd.component.html',
  styleUrls: ['./jstree-icd.component.css']
})
export class JstreeIcdComponent implements OnInit, AfterViewInit {
  @Input() elementId: string;
  @Input() treeData: any;
  applet;

  constructor(private rest: RestService,
              private globalService: GlobalService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.rest.getDataList(
      'phin/icd/?', 0, 99999
    ).subscribe(data => {
        this.treeData = data['icds'].map(
          dataEl => {
            if (dataEl['parent'] === null) {
              dataEl['parent'] = '#';
            }
            return new JstreeModel(
              dataEl.id as string,
              dataEl.parent as string,
              `${dataEl.icd_id} ${dataEl.name}`
            )
          }
        );
      this.applet = $(`#${this.elementId}`).jstree({
        core: {data: this.treeData}
      });
      const select$ = Observable.create(obs => {
        this.applet.on('changed.jstree', function (e, selectedNode) {
          obs.next(selectedNode);
        });
      });

      select$
        .subscribe(
          classNode => {
            console.log(classNode.node.id);
            this.globalService.gotoTargetList(TargetsListParamType.icdDisease, classNode.node.id);
          }
        );
      }
    );
  }

}
