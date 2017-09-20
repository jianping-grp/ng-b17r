export class Activity {
  constructor(public activity_id?: number,
              public assay?: number,
              public standard_type?: string,
              public data_validity_comment?: string,
              public bao_endpoint?: string,
              public potential_duplicate?: number,
              public standard_relation?: string,
              public uo_units?: string,
              public published_value?: string,
              public published_relation?: string,
              public doc?: number,
              public standard_value?: string,
              public qudt_units?: string,
              public standard_flag?: number,
              public published_units?: string,
              public pchembl_value?: string,
              public published_type?: string,
              public standard_units?: string,
              public molregno?: number,
              public activity_comment?: string,
              public record?: number) {
  }
}
