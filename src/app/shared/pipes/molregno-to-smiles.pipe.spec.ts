import { MolregnoToSmilesPipe } from './molregno-to-smiles.pipe';

describe('MolregnoToSmilesPipe', () => {
  it('create an instance', () => {
    const pipe = new MolregnoToSmilesPipe();
    expect(pipe).toBeTruthy();
  });
});
