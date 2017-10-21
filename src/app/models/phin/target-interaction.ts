import {PhinTarget} from './phin-target';

export class TargetInteraction {
  constructor(
    public first_target?: PhinTarget | number,
    public second_target?: PhinTarget | number,
    public activity_list?: number[]
  ) {}
}
