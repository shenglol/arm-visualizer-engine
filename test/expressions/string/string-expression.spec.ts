import { expect } from 'chai';

import { Expression, ExpressionBase, StringExpression } from '../../../src';
import { TooFewOperandsError, TooManyOperandsError } from '../../../src';

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
    return ['a', 1, 'b', 2, { foo: "bar" }];
  }
}

describe('StringExpression', () => {
  let exp: Expression;

  beforeEach(() => {
    exp = new StringExpression();
  });

  describe('evaluate()', () => {
    it('should throw no operand specified error when no operand present', () => {
      expect(() => {
        exp.evaluate();
      }).to.throw(TooFewOperandsError);
    });

    it('should throw too many operands specified error when more than one operand present', () => {
      exp.operands.push('foo');
      exp.operands.push('bar');

      expect(() => {
        exp.evaluate();
      }).to.throw(TooManyOperandsError);
    });

    it('should convert a string to string', () => {
      let valueToConvert = 'the quick fox jumps over the lazy brown dog';

      exp.operands.push(valueToConvert);

      expect(exp.evaluate()).to.equal(valueToConvert);
    });

    it('should convert an object to string', () => {
      let operand: Expression = new ObjectExpression();

      exp.operands.push(operand);

      expect(exp.evaluate()).to.equal('{"foo":"bar","array":["a",1,"b",2]}');
    });

    it('should convert an array to string', () => {
      let operand: Expression = new ArrayExpression();

      exp.operands.push(operand);

      expect(exp.evaluate()).to.equal('["a",1,"b",2,{"foo":"bar"}]');
    });
  });
});
