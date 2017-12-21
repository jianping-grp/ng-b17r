import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {ProteinClassification} from '../../../chembl/models/protein-classification';
import {JstreeModel} from '../../../layout/models/jstree-model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {filter} from 'rxjs/operators';
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
              private router: Router
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
            const proteinClass = new ProteinClassification();
            Object.assign(proteinClass, jsonData);
            return new JstreeModel(
              proteinClass.protein_class_id,
              proteinClass.parent_id,
              proteinClass.short_name
            );
          });
        // init jstree
        this.treeData[0].parent = '#';
        this.applet = $(`#${this.elementId}`).jstree({
          core: {data: this.treeData}
        });
        const select$ = Observable.create(obs => {
          this.applet.on('changed.jstree', function(e, selectedNode) {
            if (selectedNode.children.length === 0) {
              obs.next(selectedNode);
            }
          });
        })
        select$.subscribe(
          classId => {
            console.log(classId);
            // this.gotoTargetList(classId);
          }
        );
        // fromEvent(this.applet, 'select_node.jstree').subscribe(eventData => {
        //   console.log(eventData);
        // });
      });

  }
  onNodeSelect(e, selectedNode): Observable<number> {
    if (selectedNode.node.children.length === 0) {
      // this.router.navigate(['targets'], {queryParams: {proteinClass: selectedNode.node.id}});
      return of(selectedNode.node.id);
    }
  }
  gotoTargetList(proteinClassId: number): void {
    this.router.navigate(['targets'], {queryParams: {proteinClass: proteinClassId}});

  }

}
