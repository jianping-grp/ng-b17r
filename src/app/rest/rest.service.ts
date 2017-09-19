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

  getTargetDictionaryByChemblId(chemblId): Observable<any> {
    return this.fetchData(`chembl/target-dictionaries/?filter{chembl}=${chemblId}`)
  }

  keywordSearch(keyword: string, searchType: string, page = 1, perPage = Settings.PER_PAGE): Observable<any> {
    if (searchType == 'target') {
      if (keyword.toUpperCase().startsWith('CHEMBL')) {
        return this.fetchData(`chembl/target-dictionaries/?filter{chembl}=${keyword.toUpperCase()}&page=${page}&per_page=${perPage}`)
      }
      return this.fetchData(`chembl/target-dictionaries/?filter{pref_name.icontains}=${keyword}&page=${page}&per_page=${perPage}`)
    }
    else if (searchType == 'molecule') {
      if (keyword.toUpperCase().startsWith('CHEMBL')) {
        return this.fetchData(`chembl/molecule-dictionaries/?filter{chembl}=${keyword.toUpperCase()}&page=${page}&per_page=${perPage}`)
      }
      return this.fetchData(`chembl/molecule-dictionaries/?filter{pref_name.icontains}=${keyword}&page=${page}&per_page=${perPage}`)
    }
    else {
      // todo: error handler
    }
  }
}
