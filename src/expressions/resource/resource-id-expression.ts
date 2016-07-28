import * as ExpressionErrors from '../../constants/expression-errors';
import { Expression, ExpressionBase } from '../expression-base';
import { ARMTemplate } from '../../template/template';
import { Variables } from '../../template/variables';

/**
 * ResourceIdExpression
 */
export class ResourceIdExpression extends ExpressionBase {
    evaluate(): string {
        if (this._operands.length < 2) {
            throw new Error(ExpressionErrors.TOO_FEW_OPERANDS);
        }

        let resourceId = '';

        for (let operand of this.operands) {
            console.log(operand);
            resourceId += '/';
            resourceId += typeof operand === 'string'
                ? <string>operand
                : (<Expression>operand).evaluate();
        }

        return resourceId;
    }
}
