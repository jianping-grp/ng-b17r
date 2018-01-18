import {PhinTarget} from './phin-target';
import {PhinMolecule} from './phin-molecule';

export interface TargetNetwork {
  first_target?: number | PhinTarget;
  second_target?: number | PhinTarget;
  mean?: number[];
  min?: number[];
  max?: number[];
  median?: number[];
  molecule?: number[] | PhinMolecule[];
}
