import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {GlobalService} from './services/global/global.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {RestService} from './services/rest/rest.service';
import {ProteinClassification} from './models/chembl/protein-classification';
import {JstreeModel} from './models/jstree-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  title = 'ChEMBL explorer';
  loadingStatus: boolean;

  constructor(private rest: RestService,
              private globalService: GlobalService,
              private cd: ChangeDetectorRef) {
    globalService.loadingStatus$.subscribe(
      status => this.loadingStatus = status
    )
  }

  ngAfterViewInit() {
  }
  //todo: workaround for ExpressionChangedAfterItHasBeenCheckedError
  ngAfterViewChecked() {
    this.cd.detectChanges();
  }


}
