import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {GlobalService} from './services/global/global.service';
import {Observable} from 'rxjs/Observable';
import {RestService} from './services/rest/rest.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ChEMBL explorer';
  loadingStatus: boolean;
  loadingStatus$: Observable<boolean>;

  constructor(private rest: RestService,
              private router: Router,
              private globalService: GlobalService,
              private cd: ChangeDetectorRef) {
    globalService.loadingStatus$.subscribe(
      status => {
        this.loadingStatus = status;
        this.cd.detectChanges();
      }
    )
    this.loadingStatus$ = this.globalService.loadingStatus$;
  }

  ngAfterViewInit() {
  }

  goHome() {
    this.router.navigate(['/']);
  }


}
