export class JstreeModel {
  constructor(
    public id?: number | string,
    public parent?: number | string | JstreeModel,
    public text?: string,
  ) {
  }
}
