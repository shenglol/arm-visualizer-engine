import { ExpressionErrors } from '../../constants';
import { Expression, ExpressionBase } from '../expression-base';
import { Variables, ARMTemplate } from '../../template';

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
            resourceId += '/';
            resourceId += typeof operand === 'string'
                ? <string>operand
                : (<Expression>operand).evaluate();
        }

        return resourceId;
    }
}
