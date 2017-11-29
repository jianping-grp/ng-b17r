import {TargetComponents} from './target-components';

export class ComponentSequences {
  constructor(
    public db_version?: string,
    public component_id?: number, //pk
    public description?: string,
    public component_type?: string,
    public sequence?: string,
    public accession?: string,
    public sequence_md5sum?: string,
    public db_source?: string,
    public organism?: string,
    public tax_id?: number
  ){}
}
