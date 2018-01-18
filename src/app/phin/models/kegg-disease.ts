import {KeggDiseaseClass} from './kegg-disease-class';
import {ComponentSequences} from '../../chembl/models/component-sequences';

export interface KeggDisease {
  kegg_class?: KeggDiseaseClass;
  id?: number;
  chembl_mappings?: number[] | ComponentSequences[];
  kegg_id?: string;
}
