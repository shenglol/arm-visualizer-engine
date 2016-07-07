/// <reference path='../../../typings/index.d.ts' />

import { ConcatExpression } from '../../../src/expressions/string/concat-expression';

describe('ConcatExpression', () => {
  it('Should combine multiple strings', () => {
    let exp = new ConcatExpression();
    exp.operands.push('foo');
    exp.operands.push(' ');
    exp.operands.push('bar');

    expect(exp.evaluate()).toEqual('foo bar');
  });

  it('Should combine strings and nested expressions', () => {
    let nested = new ConcatExpression();
    nested.operands.push(' ');
    nested.operands.push('bar');

    let exp = new ConcatExpression();
    exp.operands.push('foo');
    exp.operands.push(nested);

    expect(exp.evaluate()).toEqual('foo bar');
  });
});
