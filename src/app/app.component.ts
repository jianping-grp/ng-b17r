import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges} from '@angular/core';
import {GlobalService} from './services/global/global.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'ChEMBL explorer';
  loadingStatus: boolean;
  constructor(
    private globalService: GlobalService,
    private cd: ChangeDetectorRef
  ) {
    globalService.loadingStatus$.subscribe(
      status => this.loadingStatus = status
    )
  }
  //todo: workaround for ExpressionChangedAfterItHasBeenCheckedError
  ngAfterViewChecked(){
    this.cd.detectChanges();
  }


}
