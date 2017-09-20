import {Injectable} from '@angular/core';
import * as Settings from '../settings';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {Subject} from 'rxjs/Subject';
import {TargetDictionary} from '../models/target-dictionary';

@Injectable()
export class RestService {
  private restHost = Settings.REST_HOST;

  constructor(private http: HttpClient) {
  }

  private fetchData(url: string): any {
    return this.http.get(`${this.restHost}/${url}`);
  }
  private fetchDataList(url: string, page=0, perPage=Settings.PER_PAGE){
    // page + 1, as md-paginator is 0-base while DRF is 1-base
    page += 1;
    return this.http.get(`${this.restHost}/${url}&page=${page}&per_page=${perPage}`);
  }

  getTargetDictionaryByTid(tid): Observable<any> {
    return this.fetchData(`chembl/target-dictionaries/${tid}`)
  }
  getActivitiesByTid(tid: string, page?, perPage?):Observable<any> {
    return this.fetchDataList(`chembl/activities/?filter{assay.tid}=${tid}`, page, perPage)
  }

  keywordSearch(keyword: string, searchType: string, page?, perPage?): Observable<any> {
    if (searchType == 'target') {
      if (keyword.toUpperCase().startsWith('CHEMBL')) {
        return this.fetchDataList(
          `chembl/target-dictionaries/?filter{chembl}=${keyword.toUpperCase()}`,
          page, perPage
        );
      }
      return this.fetchDataList(
        `chembl/target-dictionaries/?filter{pref_name.icontains}=${keyword}`,
        page, perPage
      );
    }
    else if (searchType == 'molecule') {
      if (keyword.toUpperCase().startsWith('CHEMBL')) {
        return this.fetchDataList(
          `chembl/molecule-dictionaries/?filter{chembl}=${keyword.toUpperCase()}`,
          page, perPage
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
