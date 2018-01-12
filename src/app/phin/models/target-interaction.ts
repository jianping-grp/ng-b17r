import {PhinTarget} from './phin-target';

export interface TargetInteraction {
    first_target?: PhinTarget | number;
    second_target?: PhinTarget | number;
    activity_list?: number[];
}
