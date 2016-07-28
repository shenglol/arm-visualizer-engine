import * as ExpressionErrors from '../../../src/constants/expression-errors';
import { Expression } from  '../../../src/expressions/expression-base';
import { ParametersExpression } from '../../../src/index';
import { ARMTemplate } from '../../../src/template/template';
import { expect } from 'chai';

describe('VariablesExpression', () => {
    let exp: Expression;
    let template: ARMTemplate;

    before(() => {
        template = new ARMTemplate();
    });

    describe('evaluate()', () => {
        it('should throw no operand specified error when no operand present', () => {
            exp = new ParametersExpression(template);

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.NO_OPERAND);
        });

        it('should throw too many operands specified error when more than one operand present', () => {
            exp = new ParametersExpression(template);
            exp.operands.push('foo');
            exp.operands.push('bar');

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.TOO_MANY_OPERANDS);
        });

        it('should throw no context specified error when no parameters present', () => {
            template.load(`{
                "$schema": "",
                "contentVersion": "",
                "resources": []
            }`);

            exp = new ParametersExpression(template);
            exp.operands.push('foo');

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.NO_CONTEXT + ': parameters');
        });

        it('should throw no key found error when key does not exsits in parameters', () => {
            template.load(`{
              "$schema": "",
              "contentVersion": "",
              "parameters": {},
              "resources": []
            }`);

            exp = new ParametersExpression(template);
            exp.operands.push('foo');

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.NO_KEY_FOUND + ': foo');
        });

        it('should return degenerate parameter expression string when no defaultValue or value present', () => {
            template.load(`{
              "$schema": "",
              "contentVersion": "",
              "parameters": {
                  "foo": {
                      "type": "string"
                  }
              },
              "resources": []
            }`);

            exp = new ParametersExpression(template);
            exp.operands.push('foo');

            expect(exp.evaluate()).to.equal("parameters('foo')");
        });

        it('should return parameter default value when defaultValue present', () => {
            template.load(`{
              "$schema": "",
              "contentVersion": "",
              "parameters": {
                  "foo": {
                      "type": "string",
                      "defaultValue": "bar"
                  }
              },
              "resources": []
            }`);

            exp = new ParametersExpression(template);
            exp.operands.push('foo');

            expect(exp.evaluate()).to.equal('bar');
        });

        it('should return parameter default value when value present', () => {
            template.load(`{
              "$schema": "",
              "contentVersion": "",
              "parameters": {
                  "foo": {
                      "type": "string",
                      "defaultValue": "ignored",
                      "value": "bar"
                  }
              },
              "resources": []
            }`);

            exp = new ParametersExpression(template);
            exp.operands.push('foo');

            expect(exp.evaluate()).to.equal('bar');
        });

        it('should parse expression when parameter value is an expression', () => {
            template.load(`{
              "$schema": "",
              "contentVersion": "",
              "parameters": {
                  "foo": {
                      "type": "string",
                      "defaultValue": "[concat('b', 'a', 'r')]"
                  }
              },
              "resources": []
            }`);

            exp = new ParametersExpression(template);
            exp.operands.push('foo');

            expect(exp.evaluate()).to.equal('bar');
        });
    });
});
