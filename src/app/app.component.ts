import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {GlobalService} from './services/global/global.service';
import {Observable} from 'rxjs';
import {RestService} from './services/rest/rest.service';
import {Router} from '@angular/router';
import {JsmeStructureSize} from './phin/jsme-structure-size';
import {SideNavMode} from './shared/side-nav-mode.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ChEMBL-explorer';
  tableStructureSize: JsmeStructureSize;
  loadingStatus: boolean;
  // loadingStatus$: Observable<boolean>;
  sideNavMode: SideNavMode;

  constructor(private rest: RestService,
              private router: Router,
              private globalService: GlobalService,
              private cd: ChangeDetectorRef) {
    globalService.tableStructureSize$.subscribe(size => this.tableStructureSize = size);
    globalService.sideNavMode$.subscribe(mode => this.sideNavMode = mode);
    globalService.loadingStatus$.subscribe(
      status => {
        this.loadingStatus = status;
        this.cd.detectChanges();
      }
    );
    // this.loadingStatus$ = this.globalService.loadingStatus$;
  }

  ngAfterViewInit() {
  }

  disableTooltip(event) {
    this.globalService.disableTooltip(event.checked);
  }

  changeSideNavMode(event) {
    // this.globalService.disableTooltip(event.checked);
    if (event.checked) {
      this.globalService.changeSideNavMode(SideNavMode.Push);
    } else {
      this.globalService.changeSideNavMode(SideNavMode.Side);
    }
  }

  setStructureSize() {
    // console.log(this.tableStructureSize);
    this.globalService.setTableStructureSize(this.tableStructureSize);
  }

  goHome() {
    this.router.navigate(['home']);
  }

  goHelp() {
    this.router.navigate(['help']);
  }


}
