import { expect } from 'chai';

import {
    ExpressionErrors,
    Expression,
    Base64Expression
} from '../../../src';

describe('Base64Expression', () => {
    let exp: Expression;

    beforeEach(() => {
        exp = new Base64Expression();
    });

    describe('evaluate()', () => {
        it('should throw no operand specified error when no operand present', () => {
            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.TOO_FEW_OPERANDS);
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
