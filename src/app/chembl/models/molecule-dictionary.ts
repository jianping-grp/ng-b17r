import {CompoundStructures} from './compound-structures';

export class MoleculeDictionary {
  constructor(
  public max_phase?: number,
  public molecule_type?: string,
  public withdrawn_flag?: number,
  public dosed_ingredient?: number,
  public usan_stem?: string,
  public withdrawn_reason?: string,
  public parenteral?: number,
  public chebi_par_id?: number,
  public withdrawn_country?: string,
  public biotherapeutics?: number,
  public first_approval?: number,
  public topical?: number,
  public prodrug?: number,
  public chirality?: number,
  public usan_substem?: string,
  public pref_name?: string,
  public polymer_flag?: number,
  public therapeutic_flag?: number,
  public structure_type?: string,
  public usan_stem_definition?: string,
  public natural_product?: number,
  public as_child_molecule?: number,
  public black_box_warning?: number,
  public availability_type?: number,
  public chembl?: string,
  public compoundproperties?: number,
  public inorganic_flag?: number,
  public compoundstructures?: number | CompoundStructures,
  public withdrawn_year?: number,
  public indication_class?: string,
  public usan_year?: number,
  public first_in_class?: number,
  public molregno?: number, // pk
  public oral?: number
  ){}
}
