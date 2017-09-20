import { JsmeModule } from './jsme.module';

describe('JsmeModule', () => {
  let jsmeModule: JsmeModule;

  beforeEach(() => {
    jsmeModule = new JsmeModule();
  });

  it('should create an instance', () => {
    expect(jsmeModule).toBeTruthy();
  });
});
