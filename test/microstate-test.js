import { expect } from 'chai';
import testFunc from '../src/index.js';

describe("tests are running", () => {
  let stuff;

  before(() => {
    stuff = testFunc();
  });

  it('should be hello world', () => {
    expect(stuff).to.equal('hello world');
  });
});
