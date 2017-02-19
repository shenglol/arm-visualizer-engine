import { expect } from 'chai';

import { Expression, VariablesExpression, TemplateEngine } from '../../../src';
import {
  TooFewOperandsError,
  TooManyOperandsError,
  ExpContextNotFoundError,
  PropertyNotFoundError
} from '../../../src';


describe('VariablesExpression', () => {
  let exp: Expression;
  let engine: TemplateEngine;

  beforeEach(() => {
    engine = new TemplateEngine();
  });

  describe('evaluate()', () => {
    it('should throw TooFewOperandsError when no operand present', () => {
      exp = new VariablesExpression(engine);

      expect(() => {
        exp.evaluate();
      }).to.throw(TooFewOperandsError);
    });

    it('should throw TooManyOperandsError when more than one operand present', () => {
      exp = new VariablesExpression(engine);
      exp.operands.push('foo');
      exp.operands.push('bar');

      expect(() => {
        exp.evaluate();
      }).to.throw(TooManyOperandsError);
    });

    it('should throw ExpContextNotFoundError when no variables present', () => {
      engine.loadTemplate(`{
                "$schema": "",
                "contentVersion": "",
                "resources": []
            }`);

      exp = new VariablesExpression(engine);
      exp.operands.push('foo');

      expect(() => {
        exp.evaluate();
      }).to.throw(ExpContextNotFoundError);
    });

    it('should throw PropertyNotFoundError when key does not exsits in variables', () => {
      engine.loadTemplate(`{
              "$schema": "",
              "contentVersion": "",
              "variables": {},
              "resources": []
            }`);

      exp = new VariablesExpression(engine);
      exp.operands.push('foo');

      expect(() => {
        exp.evaluate();
      }).to.throw(PropertyNotFoundError);
    });

    it('should return variable', () => {
      engine.loadTemplate(`{
              "$schema": "",
              "contentVersion": "",
              "variables": {
                  "foo": "bar"
              },
              "resources": []
            }`);

      exp = new VariablesExpression(engine);
      exp.operands.push('foo');

      expect(exp.evaluate()).to.equal('bar');
    });

    it('should return variable with nested expression operand', () => {
      engine.loadTemplate(`{
              "$schema": "",
              "contentVersion": "",
              "variables": {
                  "a": "b",
                  "b": "c"
              },
              "resources": []
            }`);

      let nested = new VariablesExpression(engine);
      nested.operands.push('a');

      exp = new VariablesExpression(engine);
      exp.operands.push(nested);

      expect(exp.evaluate()).to.equal('c');
    });

    it('should evaluate expression when variable value is an expression', () => {
      engine.loadTemplate(`{
              "$schema": "",
              "contentVersion": "",
              "variables": {
                  "42": "[concat('the ', 'meaning ', 'of ', 'life')]"
              },
              "resources": []
            }`);

      exp = new VariablesExpression(engine);
      exp.operands.push('42');

      expect(exp.evaluate()).to.equal('the meaning of life');
    });

    it('should evaluate expression with properties', () => {
      engine.loadTemplate(`{
              "$schema": "",
              "contentVersion": "",
              "variables": {
                  "a": {
                      "b": {
                          "c": "you got me!"
                      }
                  }
              },
              "resources": []
            }`);

      exp = new VariablesExpression(engine);
      exp.operands.push('a');
      exp.properties.push('b');
      exp.properties.push('c');

      expect(exp.evaluate()).to.equal('you got me!');
    });

    it('should evaluate expression with properties when variable is an expression', () => {
      engine.loadTemplate(`{
                "$schema": "",
                "contentVersion": "",
                "variables": {
                    "a": {
                        "b": {
                            "c": "[concat('you', ' got', ' me!')]"
                        }
                    }
                },
                "resources": []
            }`);

      exp = new VariablesExpression(engine);
      exp.operands.push('a');
      exp.properties.push('b');
      exp.properties.push('c');

      expect(exp.evaluate()).to.equal('you got me!');
    });

    it('should evaluate expression with complex properties when variable is an expression', () => {
      engine.loadTemplate(`{
                "$schema": "",
                "contentVersion": "",
                "variables": {
                    "a": [
                        0,
                        1,
                        {
                            "b": "[concat('you', ' got', ' me!')]"
                        }
                    ]

                },
                "resources": []
            }`);

      exp = new VariablesExpression(engine);
      exp.operands.push('a');
      exp.properties.push(2);
      exp.properties.push('b');

      expect(exp.evaluate()).to.equal('you got me!');
    });
  });
});
