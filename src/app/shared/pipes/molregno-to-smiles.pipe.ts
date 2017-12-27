import {Pipe, PipeTransform} from '@angular/core';
import {RestService} from '../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {empty} from 'rxjs/observable/empty';

@Pipe({
  name: 'molregnoToSmiles'
})
export class MolregnoToSmilesPipe implements PipeTransform {
  constructor(private rest: RestService) {
  }

  transform(molregno: any, args?: any): Observable<any> {
    return this.rest.getData(`chembl/compound-structures/${molregno}`)
      .map(data => data['compound_structures'].canonical_smiles)
      .catch(() => {
        console.log('error occur in molregno to smiles')
        return empty();
      });
  }
}
