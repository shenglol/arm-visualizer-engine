/// <reference path='../../../typings/index.d.ts' />

import * as ExpressionErrors from '../../../src/constants/expression-errors';
import { Expression, ExpressionBase } from '../../../src/expressions/expression-base';
import { StringExpression } from '../../../src/expressions/string/string-expression';

class ObjectExpression extends ExpressionBase {
  evaluate(): Object {
    return {
      foo: "bar",
      array: ["a", 1, "b", 2]
    };
  }
}

class ArrayExpression extends ExpressionBase {
  evaluate(): any[] {
    return ['a', 1, 'b', 2, { foo: "bar"}];
  }
}

describe('StringExpression', () => {

  it('Should throw no operand specified exception', () => {
    let exp: Expression = new StringExpression();

    expect(() => { exp.evaluate(); }).toThrowError(ExpressionErrors.NO_OPERAND);
  });

  it('Should throw too many operands specified exception', () => {
    let exp: Expression = new StringExpression();
    exp.operands.push('foo');
    exp.operands.push('bar');

    expect(() => { exp.evaluate(); }).toThrowError(ExpressionErrors.TOO_MANY_OPERANDS);
  });

  it('Should convert a string to a string', () => {
    let valueToConvert = 'the quick fox jumps over the lazy brown dog';
    let exp: Expression = new StringExpression();
    exp.operands.push(valueToConvert);

    let result = exp.evaluate();

    expect(result).toEqual(valueToConvert);
  });

  it('Should convert an object to a string', () => {
    let exp: Expression = new StringExpression();
    let operand: Expression = new ObjectExpression();
    exp.operands.push(operand);

    let result = exp.evaluate();

    expect(result).toEqual('{"foo":"bar","array":["a",1,"b",2]}');
  });

  it('Should convert an array to a string', () => {
    let exp: Expression = new StringExpression();
    let operand: Expression = new ArrayExpression();
    exp.operands.push(operand);

    let result = exp.evaluate();

    expect(result).toEqual('["a",1,"b",2,{"foo":"bar"}]');
  });

});
