import * as ExpressionErrors from '../../../src/constants/expression-errors';
import { Expression } from  '../../../src/expressions/expression-base';
import { ResourceIdExpression } from '../../../src/index';
import { expect } from 'chai';

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
