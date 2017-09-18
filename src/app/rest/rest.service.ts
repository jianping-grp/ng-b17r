import { Injectable } from '@angular/core';
import * as Settings from '../settings';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RestService {
  private restHost = Settings.REST_HOST;
  constructor(private http: HttpClient) { }

}
