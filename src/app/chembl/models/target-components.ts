import {TargetDictionary} from './target-dictionary';
import {ComponentSequences} from './component-sequences';

export interface TargetComponents {
  tid?: number | TargetDictionary;
  homologue?: number;
  targcomp_id?: number; //pk
  component?: number | ComponentSequences;
}
