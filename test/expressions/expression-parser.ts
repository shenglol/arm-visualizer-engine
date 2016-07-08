/// <reference path='../../typings/index.d.ts' />

import { ExpressionParser } from '../../src/expressions/expression-parser';

describe('ExpressionParser', () => {

  let parser: ExpressionParser;

  beforeAll(() => {
    parser = new ExpressionParser();
  });

  it('Should return a string for a simple source string', () => {
    let source = "nic-name";
    let result = parser.parse(source);

    expect(result).toEqual(source);
  });

  it('Should parse an expression', () => {
    let source = "[concat('foo', '-', 'bar')]";
    let result = parser.parse(source);

    expect(result).toEqual('foo-bar');
  });

  it('Should parse a nested expression', () => {
    let source = "[concat('foo', concat('-', 'bar'))]";
    let result = parser.parse(source);

    expect(result).toEqual('foo-bar');
  });

  // TODO: more tests
});
