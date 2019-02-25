import {Injectable, NgZone, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {TargetsListParamType} from '../../phin/targets-list-param-type.enum';
import {MoleculeListParamType} from '../../phin/molecule-list-param-type.enum';
import {ActivityListParamType} from '../../phin/activity-list-param-type.enum';
import {DocListParamType} from '../../phin/doc-list-param-type.enum';
import {PhinActivityListParamType} from '../../phin/phin-activity-list-param-type.enum';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PhinMoleculeParamType} from '../../phin/phin-molecule-param-type.enum';
import {JsmeStructureSize} from '../../phin/jsme-structure-size';
import {SideNavMode} from '../../shared/side-nav-mode.enum';

declare const JSApplet: any;

@Injectable()
export class GlobalService implements OnInit {
  // jsme
  JSMEApplet$ = new Subject<any>();

  constructor(private zone: NgZone,
              private router: Router) {
    this.zone.runOutsideAngular(() => {
      window['jsmeOnLoad'] = () => {
        // console.log('JSME init');
        this.JSMEApplet$.next(JSApplet);
      };
    });
  }

  // global loading
  private _globalLoading = new Subject<boolean>();
  loadingStatus$ = this._globalLoading.asObservable();
  // mat tooltip
  private _disableTooltip = new BehaviorSubject(false);
  disableTooltip$ = this._disableTooltip.asObservable();

  // side nav mode
  private _sideNavMode = new BehaviorSubject(SideNavMode.Side);
  sideNavMode$ = this._sideNavMode.asObservable();

  // jsme structure size in table
  private defaultTableStructureSize = <JsmeStructureSize> {
    width: 120,
    height: 120
  };
  private _tableStructureSize = new BehaviorSubject(this.defaultTableStructureSize);
  tableStructureSize$ = this._tableStructureSize.asObservable();

  disableTooltip(status: boolean) {
    this._disableTooltip.next(status);
  }

  changeSideNavMode(mode: SideNavMode) {
    this._sideNavMode.next(mode);
  }
  setLoading(status: boolean): void {
    this._globalLoading.next(status);
  }

  setTableStructureSize(size: JsmeStructureSize) {
    this._tableStructureSize.next(size);
  }

  // router naviations
  gotoTargetList(paramsType: TargetsListParamType, params?: any): void {
    this.router.navigate(['targets'],
      {
        queryParams: {
          targetParams: params,
          paramsType: paramsType
        }
      });
  }

  gotoPhinMoleculeList(paramsType: PhinMoleculeParamType, params?: any) {
    const queryParams = {
      paramsType: paramsType
    };
    Object.assign(queryParams, params);
    this.router.navigate(['molecules/phin-molecules'],
      {
        queryParams: queryParams
      }
    );
  }

  gotoMoleculeList(paramsType: MoleculeListParamType, params?: any) {
    const queryParams = {
      paramsType: paramsType
    };
    Object.assign(queryParams, params);
    this.router.navigate(['molecules'],
      {
        queryParams: queryParams
      }
    );
  }

  gotoDocList(paramsType: DocListParamType, params?: any) {
    const queryParams = {paramsType: paramsType};
    if (paramsType === DocListParamType.tid_year) {
      Object.assign(queryParams, params);
    } else if (paramsType === DocListParamType.molregno_year) {
      Object.assign(queryParams, params);
    } else {
      queryParams['docParams'] = params;
    }
    this.router.navigate(['documents'], {
      queryParams: queryParams
    });
  }

  gotoPhinActivityList(paramsType: PhinActivityListParamType, params?: any) {
    const queryParams = {paramsType: paramsType};
    Object.assign(queryParams, params);
    this.router.navigate(['network-datatable/phin-activities'], {
      queryParams: queryParams
    });
  }

  gotoActivityList(paramsType: ActivityListParamType, params?: any) {
    const queryParams = {paramsType: paramsType};
    if (paramsType === ActivityListParamType.mix || paramsType === ActivityListParamType.tid_moleculeProperty) {
      Object.assign(queryParams, params);
    } else {
      queryParams['activityParams'] = params;
    }
    this.router.navigate(['activities'], {
      queryParams: queryParams
    });
  }

  ngOnInit() {
    this.disableTooltip(false);
  }
}


