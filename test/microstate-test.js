import { expect } from 'chai';

import System from 'systemjs';

describe("tests are running", ()=>{
  let Microstate;

  before(() => {
    return System.import('./lib/microstate.js')
      .then((mod) => Microstate = mod);
  });

  it('should load', () => {
    expect(Microstate.default).to.equal('hello world');
  });
});