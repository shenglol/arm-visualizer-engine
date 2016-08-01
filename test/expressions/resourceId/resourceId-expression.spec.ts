import { expect } from 'chai';

import {
    ExpressionErrors,
    Expression,
    ResourceIdExpression
} from '../../../src';

describe('ResourceIdExpression', () => {
    let exp: Expression;

    beforeEach(() => {
        exp = new ResourceIdExpression();
    });

    describe('evaluate()', () => {
        it('should throw too few operands specified error when less than two operand present', () => {
            expect(() => {
                exp.evaluate();
            }).to.throw(ExpressionErrors.TOO_FEW_OPERANDS);
        });

        it('should return resource id', () => {
            exp.operands.push('myWebsitesGroup');
            exp.operands.push('Microsoft.web/sites');
            exp.operands.push('siteName');

            expect(exp.evaluate()).to.equal('/myWebsitesGroup/Microsoft.web/sites/siteName');
        });
    });
});
