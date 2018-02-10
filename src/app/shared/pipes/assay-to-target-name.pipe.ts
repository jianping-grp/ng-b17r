import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {RestService} from '../../services/rest/rest.service';

@Pipe({
  name: 'assayToTargetName'
})
export class AssayToTargetNamePipe implements PipeTransform {

  constructor(private rest: RestService) {
  }

  transform(assayId: any, args?: any): Observable<any> {
    return this.rest.getData(`chembl/assays/${assayId}?include[]=tid.*`)
      .map(data => data['target_dictionaries'][0]['pref_name'])
      .catch(() => {
        // console.log('error occur in assay to targetName');
        return empty();
      });
  }

}
