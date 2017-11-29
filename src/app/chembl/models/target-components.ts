import {TargetDictionary} from './target-dictionary';
import {ComponentSequences} from './component-sequences';

export class TargetComponents {
  constructor(
    public tid?: number | TargetDictionary,
    public homologue?: number,
    public targcomp_id?: number, //pk
    public component?: number | ComponentSequences
  ){}
}
