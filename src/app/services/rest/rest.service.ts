import {Injectable} from '@angular/core';
import * as Settings from '../../settings';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/finally';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {Subject} from 'rxjs/Subject';
import {TargetDictionary} from '../../models/target-dictionary';
import {GlobalService} from '../global/global.service';

@Injectable()
export class RestService {
  private restHost = Settings.REST_HOST;

  constructor(private http: HttpClient, private globalService: GlobalService) {
  }

  private fetchData(url: string): any {
    this.globalService.setLoading(true);
    return this.http.get(`${this.restHost}/${url}`)
      .finally(() => this.globalService.setLoading(false));
  }
  private fetchDataList(url: string, includeParam='', page=0, perPage=Settings.PER_PAGE){

    // page + 1, as md-paginator is 0-base while DRF is 1-base
    page = +(page) + 1;
    // set global loadingStatus to true
    this.globalService.setLoading(true);
    return this.http.get(`${this.restHost}/${url}${includeParam}&page=${page}&per_page=${perPage}`)
      .finally(() => this.globalService.setLoading(false)); //stop loading when finished or an error occur
  }

  getTargetDictionaryByTid(tid): Observable<any> {
    return this.fetchData(`chembl/target-dictionaries/${tid}`)
  }
  getActivitiesByTid(tid: string, includeParam, page?, perPage?):Observable<any> {
    return this.fetchDataList(`chembl/activities/?filter{assay.tid}=${tid}`, includeParam, page, perPage)
  }

  keywordSearch(keyword: string, searchType: string, page?, perPage?): Observable<any> {
    if (searchType == 'target') {
      if (keyword.toUpperCase().startsWith('CHEMBL')) {
        return this.fetchDataList(
          `chembl/target-dictionaries/?filter{chembl}=${keyword.toUpperCase()}`,
          '', page, perPage
        );
      }
      return this.fetchDataList(
        `chembl/target-dictionaries/?filter{pref_name.icontains}=${keyword}`,
        '', page, perPage
      );
    }
    else if (searchType == 'molecule') {
      if (keyword.toUpperCase().startsWith('CHEMBL')) {
        return this.fetchDataList(
          `chembl/molecule-dictionaries/?filter{chembl}=${keyword.toUpperCase()}`,
          '', page, perPage
        );
      }

      return this.fetchDataList(
        `chembl/molecule-dictionaries/?filter{pref_name.icontains}=${keyword}`,
        page, perPage
      );
    }
    else {
      // todo: error handler
    }
  }
}
