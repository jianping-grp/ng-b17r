export class ProteinClassification {
  constructor(public definition?: string,
              public class_level?: number,
              public short_name?: string,
              public parent_id?: number,
              public protein_class_id?: number,
              public protein_class_desc?: string,
              public pref_name?: string) {
  }
  // toJstreeModel(): JstreeModel{
  //   return new JstreeModel(
  //     this.protein_class_id,
  //     this.parent_id,
  //     this.short_name
  //   )
  // }
}
