import * as ExpressionErrors from '../../../src/constants/expression-errors';
import { Expression } from  '../../../src/expressions/expression-base';
import { Base64Expression } from '../../../src/expressions/string/base64-expression';
import { expect } from 'chai';

describe('Base64Expression', () => {
    let exp: Expression;

    beforeEach(() => {
        exp = new Base64Expression();
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

        it('should return the base64 representation of the raw string', () => {
            let rawString = 'the quick fox jumps over the lazy brown dog';
            let encodedString = new Buffer(rawString).toString('base64');

            exp.operands.push(rawString);

            expect(exp.evaluate()).to.equal(encodedString);
        });
    });
});
