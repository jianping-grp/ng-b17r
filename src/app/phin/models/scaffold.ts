import {PhinMolecule} from './phin-molecule';

export interface Scaffold {
  scaffold_id?: number;
  smiles?: string;
  molecule_set: number[] | PhinMolecule[];
}
