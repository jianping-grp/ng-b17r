import {Injectable} from '@angular/core';
import * as Settings from '../../settings';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/finally';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from '../global/global.service';
import {Doc} from '../../chembl/models/doc';
import {Assay} from '../../chembl/models/assay';

@Injectable()
export class RestService {
  private restHost = Settings.REST_HOST;

  constructor(private http: HttpClient, private globalService: GlobalService) {
  }

  public getData(url: string): Observable<any> {
    // this.globalService.setLoading(true);
    return this.http.get(`${this.restHost}/${url}`);
    // .finally(() => this.globalService.setLoading(false));
  }

  public getDataList(url: string,
                     page = 0,
                     perPage = Settings.PER_PAGE,
                     sortby = '', extraParam = ''): Observable<any> {
    // page + 1, as mat-paginator is 0-base while DRF is 1-base
    page = +(page) + 1;
    // set global loadingStatus to true
    this.globalService.setLoading(true);

    let sortParam = '';
    if (sortby !== '') {
      sortParam = `&sort[]=${sortby}`;
    }
    return this.http.get(`${this.restHost}/${url}${extraParam}&page=${page}&per_page=${perPage}${sortParam}`)
      .finally(() => {
        this.globalService.setLoading(false);
      });
  }

  private fetchData(url: string): any {
    this.globalService.setLoading(true);
    return this.http.get(`${this.restHost}/${url}`)
      .finally(() => this.globalService.setLoading(false));
  }

  private fetchDataList(url: string, includeParam = '', page = 0, perPage = Settings.PER_PAGE) {

    // page + 1, as mat-paginator is 0-base while DRF is 1-base
    page = +(page) + 1;
    // set global loadingStatus to true
    this.globalService.setLoading(true);
    return this.http.get(`${this.restHost}/${url}${includeParam}&page=${page}&per_page=${perPage}`)
      .finally(() => this.globalService.setLoading(false)); // stop loading when finished or an error occur
  }

  getTargetDictionaryByTid(tid): Observable<any> {
    return this.fetchData(`chembl/target-dictionaries/${tid}`);
  }

  getActivitiesByTid(tid: string, includeParam, page?, perPage?): Observable<any> {
    return this.fetchDataList(`chembl/activities/?filter{assay.tid}=${tid}`, includeParam, page, perPage);
  }

  targetKeywordSearch(keyword: string,
                      page?: number,
                      perPage?: number,
                      sortBy?: string) {
    if (keyword.toUpperCase().startsWith('CHEMBL')) {
      return this.getDataList(
        `chembl/target-dictionaries/?filter{chembl}=${keyword.toUpperCase()}`,
        page, perPage, sortBy
      );
    }
    return this.getDataList(
      `chembl/target-dictionaries/?filter{pref_name.icontains}=${keyword}`,
      page, perPage, sortBy
    );
  }

  keywordSearch(keyword: string,
                searchType: string,
                page?: number, perPage?: number,
                sortby?: string,
                extraParam?: string): Observable<any> {
    if (searchType === 'target') {
      if (keyword.toUpperCase().startsWith('CHEMBL')) {
        return this.getDataList(
          `chembl/target-dictionaries/?filter{chembl}=${keyword.toUpperCase()}`,
          page, perPage, sortby, extraParam
        );
      }
      return this.getDataList(
        `chembl/target-dictionaries/?filter{pref_name.icontains}=${keyword}`,
        page, perPage, sortby, extraParam
      );
    } else if (searchType === 'molecule') {
      if (keyword.toUpperCase().startsWith('CHEMBL')) {
        return this.getDataList(
          `chembl/molecule-dictionaries/?filter{chembl}=${keyword.toUpperCase()}`,
          page, perPage, sortby, extraParam
        );
      }

      return this.getDataList(
        `chembl/molecule-dictionaries/?filter{pref_name.icontains}=${keyword}`,
        page, perPage, sortby, extraParam
      );
    } else {
      // todo: error handler
    }
  }

  getDocById(docId: number | string): Observable<Doc> {
    return this.getData(`chembl/docs/${docId}`)
      .map(data => data['docs']);
  }

  getSmilesByMolregno(molregno: number | string): Observable<string> {
    return this.getData(`chembl/compound-structures/${molregno}/?exclude[]=*&include[]=canonical_smiles`)
      .map(data => data['compound_structures']['canonical_smiles']);
  }

  getAssayByAssayId(assayId: number | string): Observable<Assay> {
    return this.getData(`chembl/assays/${assayId}`)
      .map(data => data['assays']);
  }

  // POST
  postRequest(url: string, data: any, page = 0, perPage = 10, sortBy = ''): Observable<any> {
    page = +(page) + 1;
    let sortParam = ''
    if (sortBy !== '') {
      sortParam = `&sort[]=${sortBy}`;
    }
    return this.http.post(
      `${this.restHost}${url}&page=${page}&per_page=${perPage}${sortParam}`,
      data
    );
  }
}
