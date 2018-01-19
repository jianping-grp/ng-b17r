import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {TargetsListParamType} from '../../phin/targets-list-param-type.enum';
import {MoleculeListParamType} from '../../phin/molecule-list-param-type.enum';
import {ActivityListParamType} from '../../phin/activity-list-param-type.enum';
import {DocListParamType} from '../../phin/doc-list-param-type.enum';

declare const JSApplet: any;

@Injectable()
export class GlobalService {
  // jsme
  JSMEApplet$ = new Subject<any>();

  constructor(private zone: NgZone,
              private router: Router) {
    this.zone.runOutsideAngular(() => {
      window['jsmeOnLoad'] = () => {
        console.log('JSME init');
        this.JSMEApplet$.next(JSApplet);
      };
    });
  }

  // global loading status
  private _globalLoading = new Subject<boolean>();
  loadingStatus$ = this._globalLoading.asObservable();

  setLoading(status: boolean): void {
    this._globalLoading.next(status);
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

  gotoMoleculeList(paramsType: MoleculeListParamType, params?: any) {
    this.router.navigate(['molecules'],
      {
        queryParams: {
          moleculeParams: params,
          paramsType: paramsType
        }
      }
    );
  }

  gotoDocList(paramsType: DocListParamType, params?: any) {
    const queryParams = {paramsType: paramsType};
    if (paramsType === DocListParamType.tid_year) {
      Object.assign(queryParams, params);
    } else {
      queryParams['docParams'] = params;
    }
    this.router.navigate(['documents'], {
      queryParams: queryParams
    });
  }

  gotoActivityList(paramsType: ActivityListParamType, params?: any) {
    const queryParams = {paramsType: paramsType};
    if (paramsType === ActivityListParamType.mix || paramsType === ActivityListParamType.moleculeProperty) {
      Object.assign(queryParams, params);
    } else {
      queryParams['activityParams'] = params;
    }
    this.router.navigate(['activities'], {
      queryParams: queryParams
    });
  }
}

