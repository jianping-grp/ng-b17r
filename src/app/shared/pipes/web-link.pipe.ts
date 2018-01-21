import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'webLink'
})
export class WebLinkPipe implements PipeTransform {

  transform(value: string | number, resourceName?: string): string {
    switch (resourceName) {
      case 'doi': return `https://doi.org/${value}`;
      case 'pubmed': return `https://www.ncbi.nlm.nih.gov/pubmed/${value}`;
      case 'SWISS-PROT': return `http://www.uniprot.org/uniprot/${value}`;
      case 'chembl-target': return `https://www.ebi.ac.uk/chembl/target/inspect/${value}`;
      case 'chembl-molecule': return `https://www.ebi.ac.uk/chembl/compound/inspect/${value}`;
      case 'chembl-assay': return `https://www.ebi.ac.uk/chembl/assay/inspect/${value}`;
      case 'chembl-doc': return `https://www.ebi.ac.uk/chembl/doc/inspect/${value}`;
      case 'kegg-disease': return `http://www.kegg.jp/dbget-bin/www_bget?ds:${value}`;
      default: return '';
    }
  }

}
