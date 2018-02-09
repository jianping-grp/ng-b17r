export enum ActivityTooltips {
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
}
