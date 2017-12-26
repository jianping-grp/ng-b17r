import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rmAsterisk'
})
export class RmAsteriskPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.replace(/\[\*:\d\]/g,'');
  }

}
