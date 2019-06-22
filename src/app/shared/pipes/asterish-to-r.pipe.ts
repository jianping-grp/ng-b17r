import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterishToR'
})
export class AsterishToRPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace(/\*/g, 'R');
  }

}
