import { Pipe, PipeTransform } from '@angular/core';
import {RestService} from '../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';

@Pipe({
  name: 'scaffoldIdToSmiles'
})
export class ScaffoldIdToSmilesPipe implements PipeTransform {
  constructor(private rest: RestService) {}

  transform(scaffoldId: any, args?: any): Observable<any> {
    return this.rest.getData(`phin/scaffolds/${scaffoldId}`)
      .map(data => data['scaffold'].smiles)
      .catch(() => {
        console.log('error occur in scaffoldId to smiles');
        return empty();
      });
  }

}
