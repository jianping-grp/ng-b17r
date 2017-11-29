import {TargetDictionary} from '../chembl/target-dictionary';

export class PhinTarget {
  constructor(
    public tid?: TargetDictionary | number,
    public target_id?: number
  ) {}
}
