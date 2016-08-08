import { expect } from 'chai';

import { Expression, ResourceIdExpression } from '../../../src';
import { TooFewOperandsError } from '../../../src';

describe('ResourceIdExpression', () => {
    let exp: Expression;

    beforeEach(() => {
        exp = new ResourceIdExpression();
    });

    describe('evaluate()', () => {
        it('should throw too few operands specified error when less than two operand present', () => {
            expect(() => {
                exp.evaluate();
            }).to.throw(TooFewOperandsError);
        });

        it('should return resource id', () => {
            exp.operands.push('myWebsitesGroup');
            exp.operands.push('Microsoft.web/sites');
            exp.operands.push('siteName');

            expect(exp.evaluate()).to.equal('/myWebsitesGroup/Microsoft.web/sites/siteName');
        });
    });
});
