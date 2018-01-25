import {MoleculeDictionary} from './molecule-dictionary';
import {LigandEff} from './ligand-eff';

export interface Activity {
  activity_id?: number;
  assay?: number;
  standard_type?: string;
  data_validity_comment?: string;
  bao_endpoint?: string;
  potential_duplicate?: number;
  standard_relation?: string;
  uo_units?: string;
  published_value?: string;
  published_relation?: string;
  doc?: number;
  standard_value?: string;
  qudt_units?: string;
  standard_flag?: number;
  published_units?: string;
  pchembl_value?: number;
  published_type?: string;
  standard_units?: string;
  molregno?: number | MoleculeDictionary;
  activity_comment?: string;
  record?: number;
  ligandeff?: number | LigandEff;
}
