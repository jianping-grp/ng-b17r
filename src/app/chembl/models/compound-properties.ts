import {MoleculeDictionary} from './molecule-dictionary';

export interface CompoundProperties {
  num_ro5_violations?: number;
  mw_freebase?: number;
  psa?: number;
  rtb?: number;
  acd_logd?: number;
  full_molformula?: string;
  hbd_lipinski?: number;
  mw_monoisotopic?: number;
  num_lipinski_ro5_violations?: number;
  alogp?: number;
  acd_most_apka?: number;
  acd_most_bpka?: number;
  acd_logp?: number;
  ro3_pass?: string;
  num_alerts?: number;
  hbd?: number;
  molecular_species?: string;
  heavy_atoms?: number;
  aromatic_rings?: number;
  hba?: number;
  full_mwt?: number;
  molregno?: number | MoleculeDictionary;
  qed_weighted?: number;
  hba_lipinski?: number;
}
