import { Pipe, PipeTransform } from '@angular/core';
import {RestService} from '../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';

@Pipe({
  name: 'molregnoToSmiles'
})
export class MolregnoToSmilesPipe implements PipeTransform {
  constructor(private rest: RestService) {}

  transform(value: string | number, args?: any): Observable<string> {
    return this.rest.getSmilesByMolregno(value);
  }

}
