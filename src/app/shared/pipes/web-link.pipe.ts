import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'webLink'
})
export class WebLinkPipe implements PipeTransform {

  transform(value: string | number, resourceName?: string): string {
    switch (resourceName) {
      case 'doi': return `https://doi.org/${value}`;
      case 'pubmed': return `https://www.ncbi.nlm.nih.gov/pubmed/${value}`;
      default: return resourceName;
    }
  }

}
