/// <reference path='../../typings/index.d.ts' />

import { ExpressionBase } from '../../src/expressions/expression-base';

class MockExpression extends ExpressionBase {
  evaluate(): string {
    return '';
  }
}

describe('ConcatExpression', () => {

  it('Should convert simple expression to string', () => {
    let exp = new MockExpression();
    exp.operands.push('foo');
    exp.operands.push(' ');
    exp.operands.push('bar');

    expect(exp.toString()).toEqual("mock('foo', ' ', 'bar')");
  });

  it('Should convert nested expression to string', () => {
    let operand = new MockExpression();
    operand.operands.push(' ');
    operand.operands.push('bar');

    let exp = new MockExpression();
    exp.operands.push('foo');
    exp.operands.push(operand);

    expect(exp.toString()).toEqual("mock('foo', mock(' ', 'bar'))");
  });

  it('Should convert simple expression with properties to string', () => {
    let exp = new MockExpression();
    exp.operands.push('foo');
    exp.properties.push('a');
    exp.properties.push('b');

    expect(exp.toString()).toEqual("mock('foo').a.b");
  });

  it ('Should convert expression with nested properties to string', () => {
    let prop = new MockExpression();
    prop.operands.push('bar');

    let exp = new MockExpression();
    exp.operands.push('foo');
    exp.properties.push(prop);
    exp.properties.push('a');

    expect(exp.toString()).toEqual("mock('foo')[mock('bar')].a");
  });

  it ('Should convert nested expression with nested properties to string', () => {
    let nestedProp = new MockExpression();
    nestedProp.operands.push('foo');
    nestedProp.operands.push('bar');

    let operand = new MockExpression();
    operand.operands.push('b');
    operand.operands.push('c');
    operand.properties.push('m');
    operand.properties.push(nestedProp);

    let prop = new MockExpression();
    prop.operands.push('x');
    prop.operands.push('y');

    let exp = new MockExpression();
    exp.operands.push('a');
    exp.operands.push(operand);
    exp.properties.push(prop);
    exp.properties.push('n');

    expect(exp.toString()).toEqual(
      "mock('a', mock('b', 'c').m[mock('foo', 'bar')])[mock('x', 'y')].n");
  });

});

