import {Pipe, PipeTransform} from '@angular/core';
import {RestService} from '../../services/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';

@Pipe({
  name: 'docIdtoJournal'
})

export class DocIdToJournalPipe implements PipeTransform {

  constructor(private rest: RestService) {
  }

  transform(docId: any, args?: any): Observable<any> {
    return this.rest.getData(`chembl/docs/${docId}`)
      .map(data => {
          if (data['docs']['journal'] === null) {
            return docId;
          }
          if (data['docs']['year'] === null) {
            return data['docs']['journal'];
          }
          return `${data['docs']['journal']}` + `(${data['docs']['year']})`;

        }
        // + `[${data['docs']['issue']}]` +`${data['docs']['first_page']} - ${data['docs']['last_page']}`
      )
      .catch(() => {
        // console.log('error occur in docId to journal');
        return empty();
      });
  }

}
