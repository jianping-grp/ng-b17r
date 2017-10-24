import { JstreeModule } from './jstree.module';

describe('JstreeModule', () => {
  let jstreeModule: JstreeModule;

  beforeEach(() => {
    jstreeModule = new JstreeModule();
  });

  it('should create an instance', () => {
    expect(jstreeModule).toBeTruthy();
  });
});
