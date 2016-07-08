/// <reference path='../../../typings/index.d.ts' />

import * as ExpressionErrors from '../../../src/constants/expression-errors';
import { Expression } from  '../../../src/expressions/expression-base';
import { Base64Expression } from '../../../src/expressions/string/base64-expression';

describe('ConcatExpression', () => {

  it('Should throw no operand specified exception', () => {
    let exp: Expression = new Base64Expression();

    expect(() => { exp.evaluate(); }).toThrowError(ExpressionErrors.NO_OPERAND);
  });

  it('Should throw too many operands specified exception', () => {
    let exp: Expression = new Base64Expression();
    exp.operands.push('foo');
    exp.operands.push('bar');

    expect(() => { exp.evaluate(); }).toThrowError(ExpressionErrors.TOO_MANY_OPERANDS);
  });

  it('Should return the base64 representation of the raw string', () => {
    let rawString = 'the quick fox jumps over the lazy brown dog';
    let exp: Expression = new Base64Expression();
    exp.operands.push(rawString);

    let encodedString = new Buffer(rawString).toString('base64');
    let result = exp.evaluate();

    expect(result).toEqual(encodedString);
  });

});
