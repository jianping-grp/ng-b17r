export class TargetDictionary {
  constructor(
    public chembl: string,
    public tid: number,
    public species_group_flag: number,
    public organism: string,
    public target_type: string,
    public pref_name: string,
    public tax_id: number
  ){}
}
