import { expect } from 'chai';

import { ConcatExpression } from '../../../src';
import { InvalidOperandTypeError } from '../../../src';

describe('ConcatExpression', () => {
    describe('evaluate()', () => {
        it ('should throw invalid operand type when operands contains number', () => {
            let exp = new ConcatExpression();

            exp.operands.push('foo');
            exp.operands.push(25);

            expect(() => {
                exp.evaluate();
            }).to.throw(InvalidOperandTypeError);
        });

        it('should combine multiple strings', () => {
            let exp = new ConcatExpression();

            exp.operands.push('foo');
            exp.operands.push(' ');
            exp.operands.push('bar');

            expect(exp.evaluate()).to.equal('foo bar');
        });
    });
});
