import {Scaffold} from './scaffold';
import {MoleculeDictionary} from '../../chembl/models/molecule-dictionary';

export interface PhinMolecule {
  mol_id?: number;
  scaffold?: Scaffold;
  molregno?: MoleculeDictionary;
}
