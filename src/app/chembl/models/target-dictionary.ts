import {TargetComponents} from './target-components';
import {TargetRelations} from './target-relations';

export interface TargetDictionary {
  chembl?: string;
  tid?: number;
  species_group_flag?: number;
  organism?: string;
  target_type?: string;
  pref_name?: string;
  tax_id?: number;
  assays_count?: number;
  targetcomponents_set?: number[] | TargetComponents[];
  phin_id?: number;
  related_target?: TargetRelations[];
}
