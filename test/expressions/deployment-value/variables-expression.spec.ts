import * as ExpressionErrors from '../../../src/constants/expression-errors';
import { Expression } from  '../../../src/expressions/expression-base';
import { VariablesExpression } from '../../../src/expressions/deployment-value/variables-expression';
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
            exp = new VariablesExpression(template);

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.NO_OPERAND);
        });

        it('should throw too many operands specified error when more than one operand present', () => {
            exp = new VariablesExpression(template);
            exp.operands.push('foo');
            exp.operands.push('bar');

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.TOO_MANY_OPERANDS);
        });

        it('should throw no context specified error when no variables present', () => {
            template.load(`{
                "$schema": "",
                "contentVersion": "",
                "resources": []
            }`);

            exp = new VariablesExpression(template);
            exp.operands.push('foo');

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.NO_CONTEXT + ': variables');
        });

        it('should throw no key found error when key does not exsits in variables', () => {
            template.load(`{
              "$schema": "",
              "contentVersion": "",
              "variables": {},
              "resources": []
            }`);

            exp = new VariablesExpression(template);
            exp.operands.push('foo');

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.NO_KEY_FOUND + ': foo');
        });

        it('should return variable', () => {
            template.load(`{
              "$schema": "",
              "contentVersion": "",
              "variables": {
                  "foo": "bar"
              },
              "resources": []
            }`);

            exp = new VariablesExpression(template);
            exp.operands.push('foo');

            expect(exp.evaluate()).to.equal('bar');
        });

        it('should return variable with nested expression operand', () => {
            template.load(`{
              "$schema": "",
              "contentVersion": "",
              "variables": {
                  "a": "b",
                  "b": "c"
              },
              "resources": []
            }`);

            let nested = new VariablesExpression(template);
            nested.operands.push('a');

            exp = new VariablesExpression(template);
            exp.operands.push(nested);

            expect(exp.evaluate()).to.equal('c');
        });

        it('should parse expression when variable value is an expression', () => {
            template.load(`{
              "$schema": "",
              "contentVersion": "",
              "variables": {
                  "42": "[concat('the ', 'meaning ', 'of ', 'life')]"
              },
              "resources": []
            }`);

            exp = new VariablesExpression(template);
            exp.operands.push('42');

            expect(exp.evaluate()).to.equal('the meaning of life');
        });
    });
});
