import {PhinTarget} from './phin-target';
import {PhinMolecule} from './phin-molecule';

export interface PhinActivity {
  count?: number;
  act_id?: number;
  target?: PhinTarget | number;
  molecule?: PhinMolecule | number;
  mean?: number;
  max?: number;
  min?: number;
  median?: number;
}
