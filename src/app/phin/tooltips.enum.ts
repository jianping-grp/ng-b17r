export enum Tooltips {
  chembl = 'ChEMBL identifier',
  // activity
  pchembl_value = 'Negative log of selected concentration-response activity values (IC50/EC50/XC50/AC50/Ki/Kd/Potency)',
  standard_relation = '	Symbol constraining the activity value (e.g. >, <, =)',
  standard_value = 'Same as "Published value" but transformed to common units: e.g. mM concentrations converted to nM',
  standard_units = 'Units of measurement as they appear in the original publication',
  standard_flag = 'Shows whether the standardised columns have been curated/set (1) or just default to the published data (0)',
  standard_type = 'Standardised version of the published_activity_type (e.g. IC50 rather than Ic-50/Ic50/ic50/ic-50)',
  published_value = 'Datapoint value as it appears in the original publication',
  published_units = 'Units of measurement as they appear in the original publication',
  published_relation = 'Symbol constraining the activity value (e.g. >, <, =), as it appears in the original publication',
  published_type = 'Type of end-point measurement: e.g. IC50, LD50, %inhibition etc, as it appears in the original publication',
  activity_comment = 'Describes non-numeric activities i.e. "Slighty active", "Not determined"',
  uo_units = 'ID for the corresponding unit in Unit Ontology (based on standard_units)',
  qudt_units = 'ID for the corresponding unit in QUDT Ontology (based on standard_units)',
  // target dictionary
  target_type = 'Describes whether target is a protein, an organism, a tissue etc.',
  organism = 'Source organism of molecuar target or tissue, or the target organism if compound activity is reported in an organism rather than a protein or tissue',
  pref_name = 'Preferred target name: manually curated',
  // molecule dictionary
  max_phase = 'Maximum phase of development reached for the compound (4 = approved). Null where max phase has not yet been assigned.',
  therapeutic_flag = 'Indicates that a drug has a therapeutic application (as opposed to e.g., an imaging agent, additive etc).',
  dosed_ingredient = 'Indicates that the drug is dosed in this form (e.g., a particular salt)',
  structure_type = 'Indications whether the molecule has a small molecule structure or a protein sequence (MOL indicates an entry in the compound_structures table, SEQ indications an entry in the protein_therapeutics table, NONE indicates an entry in neither table, e.g., structure unknown)',
  molecule_type = 'Type of molecule (Small molecule, Protein, Antibody, Oligosaccharide, Oligonucleotide, Cell, Unknown)',
  first_approval = 'Earliest known approval year for the molecule',
  oral = 'Indicates whether the drug is known to be administered orally',
  parenteral = 'Indicates whether the drug is known to be administered parenterally',
  topical = '	Indicates whether the drug is known to be administered topically',
  black_box_warning = 'Indicates that the drug has a black box warning',
  natural_product = 'Indicates whether the compound is natural product-derived (currently curated only for drugs)',
  first_in_class = 'Indicates whether this is known to be the first compound of its class (e.g., acting on a particular target)',
  chirality = 'Shows whether a drug is dosed as a racemic mixture (0), single stereoisomer (1) or is an achiral molecule (2)',
  prodrug = '	Indicates that the molecule is a pro-drug (see molecule hierarchy for active component, where known)',
  inorganic_flag = 'Indicates whether the molecule is inorganic (i.e., containing only metal atoms and <2 carbon atoms)',
  usan_year = 'The year in which the application for a USAN/INN name was made',
  availability_type = 'The availability type for the drug (0 = discontinued, 1 = prescription only, 2 = over the counter)',
  usan_stem = 'Where the compound has been assigned a USAN name, this indicates the stem, as described in the USAN_STEM table',
  polymer_flag = 'Indicates whether a molecule is a small molecule polymer (e.g., polistyrex)',
  usan_substem = 'Where the compound has been assigned a USAN name, this indicates the substem',
  usan_stem_definition = 'Definition of the USAN stem',
  indication_class = 'Indication class(es) assigned to a drug in the USP dictionary',
  withdraw_flag = 'Flag indicating whether the drug has been withdrawn in at least one country (not necessarily in the US)',
  withdrawn_year = 'Year the drug was first withdrawn in any country',
  withdrawn_country = 'List of countries/regions where the drug has been withdrawn',
  withdrawn_reason = 'Reasons for withdrawl (e.g., safety)',
  // compound properties
  mw_freebase = 'Molecular weight of parent compound',
  alogp = 'Calculated ALogP',
  hba = 'Number hydrogen bond acceptors',
  hbd = 'Number hydrogen bond donors',
  psa = 'Polar surface area',
  rtb = 'Number rotatable bonds',
  ro3_pass = 'Indicates whether the compound passes the rule-of-three (mw < 300, logP < 3 etc)',
  num_ro5_violations = 'Number of violations of Lipinski\'s rule-of-five, using HBA and HBD definitions',
  acd_most_apka = 'The most acidic pKa calculated using ACDlabs v12.01',
  acd_most_bpka = 'The most basic pKa calculated using ACDlabs v12.01',
  acd_logp = 'The calculated octanol/water partition coefficient using ACDlabs v12.01',
  acd_logd = 'The calculated octanol/water distribution coefficient at pH7.4 using ACDlabs v12.01',
  molecular_species = 'Indicates whether the compound is an acid/base/neutral',
  full_mwt = 'Molecular weight of the full compound including any salts',
  aromatic_rings = 'Number of aromatic rings',
  heavy_atoms = 'Number of heavy (non-hydrogen) atoms',
  num_alerts = 'Number of structural alerts for QED calculation (as defined by Brenk et al., ChemMedChem 2008)',
  qed_weighted = 'Weighted quantitative estimate of drug likeness (as defined by Bickerton et al., Nature Chem 2012)',
  mw_monoisotopic = 'Monoisotopic parent molecular weight',
  full_molformula = 'Molecular formula for the full compound (including any salt)',
  hba_lipinski = "Number of hydrogen bond acceptors calculated according to Lipinski's original rules (i.e., N + O count))",
  hbd_lipinski = "Number of hydrogen bond donors calculated according to Lipinski's original rules (i.e., NH + OH count)",
  num_lipinski_ro5_violations = "Number of violations of Lipinski's rule of five using HBA_LIPINSKI and HBD_LIPINSKI counts",
}
