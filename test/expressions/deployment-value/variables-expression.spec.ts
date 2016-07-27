import * as ExpressionErrors from '../../../src/constants/expression-errors';
import { Expression } from  '../../../src/expressions/expression-base';
import { VariablesExpression } from '../../../src/expressions/deployment-value/variables-expression';
import { expect } from 'chai';

describe('VariablesExpression', () => {
    let exp: Expression;

    beforeEach(() => {
        exp = new VariablesExpression();
    });

    describe('evaluate()', () => {
        it('should throw no operand specified error when no operand present', () => {
            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.NO_OPERAND);
        });

        it('should throw too many operands specified error when more than one operand present', () => {
            exp.operands.push('foo');
            exp.operands.push('bar');

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.TOO_MANY_OPERANDS);
        });

        it('should throw no context specified error when no variables present', () => {
            exp.operands.push('foo');

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.NO_CONTEXT);
        });

        it('should throw no key found error when key does not exsits in variables', () => {
            exp.operands.push('foo');
            exp.context = {};

            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.NO_KEY_FOUND);
        });

        it('should return variable', () => {
            exp.operands.push('foo');
            exp.context = {
                'foo': 'bar'
            };

            expect(exp.evaluate()).to.equal('bar');
        });

        it('should return variable with nested expression operand', () => {
            let nested = new VariablesExpression();
            nested.operands.push('name');
            nested.context = {
                'name': 'foo'
            };

            exp.operands.push(nested);
            exp.context = {
                'foo': 'bar'
            };

            expect(exp.evaluate()).to.equal('bar');
        })
    });
});
