import {Doc} from './doc';
import {TargetDictionary} from './target-dictionary';

export interface Assay {
  assay_id: number;
  doc: Doc | number;
  description: string;
  assay_type: string;
  assay_test_type: string;
  assay_category: string;
  assay_organism: string;
  assay_tax_id: number;
  assay_strain: string;
  assay_tissue: string;
  assay_cell_type: string;
  assay_subcellular_fraction: string;
  tid: TargetDictionary | number;
  relationship_type: string;
  confidence_score: number;
  curated_by: string;
  src: number;
  src_assay_id: string;
  chembl: string;
  cell: number;
  bao_format: string;
  tissue: number;
  variant: string;
}
