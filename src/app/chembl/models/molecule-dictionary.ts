import {CompoundStructures} from './compound-structures';

export interface MoleculeDictionary {

  max_phase: number;
  molecule_type: string;
  withdrawn_flag: number;
  dosed_ingredient: number;
  usan_stem: string;
  withdrawn_reason: string;
  parenteral: number;
  chebi_par_id: number;
  withdrawn_country: string;
  biotherapeutics: number;
  first_approval: number;
  topical: number;
  prodrug: number;
  chirality: number;
  usan_substem: string;
  pref_name: string;
  polymer_flag: number;
  therapeutic_flag: number;
  structure_type: string;
  usan_stem_definition: string;
  natural_product: number;
  as_child_molecule: number;
  black_box_warning: number;
  availability_type: number;
  chembl: string;
  compoundproperties: number;
  inorganic_flag: number;
  compoundstructures: CompoundStructures | number;
  withdrawn_year: number;
  indication_class: string;
  usan_year: number;
  first_in_class: number;
  molregno: number; // pk
  oral: number;
  activities_count: number;
}
