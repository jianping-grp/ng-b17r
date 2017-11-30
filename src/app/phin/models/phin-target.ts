import {TargetDictionary} from '../../chembl/models';

export class PhinTarget {
  constructor(
    public tid?: TargetDictionary | number,
    public target_id?: number
  ) {}
}
