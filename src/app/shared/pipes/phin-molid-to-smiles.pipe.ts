import { Pipe, PipeTransform } from '@angular/core';
import {RestService} from '../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';

@Pipe({
  name: 'phinMolidToSmiles'
})
export class PhinMolidToSmilesPipe implements PipeTransform {

  constructor(private rest: RestService) {
  }

  transform(molId: any, args?: any): Observable<any> {
    if (molId !== null) {
      return this.rest.getDataList(
          `chembl/compound-structures/?filter{molregno.phin_id}=36383&exclude[]=*&include[]=canonical_smiles`
      )
        .map(data => data['compound_structures'][0].canonical_smiles)
        .catch(() => {
          // console.log('error occur in molregno to smiles');
          return empty();
        });
    }
  }

}
