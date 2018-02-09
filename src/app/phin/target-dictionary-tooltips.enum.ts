export enum TargetDictionaryTooltips {
  chembl = 'ChEMBL identifier',
  target_type = 'Describes whether target is a protein, an organism, a tissue etc.',
  organism = 'Source organism of molecuar target or tissue, or the target organism if compound activity is reported in an organism rather than a protein or tissue',
  pref_name = 'Preferred target name: manually curated',
  species_group_flag = 'Flag to indicate whether the target represents a group of species, rather than an individual species (e.g., \'Bacterial DHFR\'). Where set to 1, indicates that any associated target components will be a representative, rather than a comprehensive set.',
  assays = 'Number of assays reported',
  accessions = 'Accession for the sequence in the source database from which it was taken (e.g., UniProt accession for proteins).',
}
