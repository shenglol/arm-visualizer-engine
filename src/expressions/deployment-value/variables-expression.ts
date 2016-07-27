import * as ExpressionErrors from '../../constants/expression-errors';
import { Expression, ExpressionBase } from '../expression-base';
import { Variables } from '../../template/Variables';
import { Contextual } from '../expression-context';

/**
 * VarialbesExpression
 */
export class VariablesExpression extends ExpressionBase implements Contextual {
    contextId: string = 'variables';
    context: Variables;

    evaluate(): string | Object | any[] {
        if (this._operands.length === 0) {
            throw new Error(ExpressionErrors.NO_OPERAND);
        }
        if (this._operands.length > 1) {
            throw new Error(ExpressionErrors.TOO_MANY_OPERANDS);
        }

        if (!this.context) {
            throw new Error(ExpressionErrors.NO_CONTEXT + ': ' + this.contextId);
        }

        let key: string = typeof this.operands[0] === 'string'
            ? <string>this.operands[0]
            : <string>(<Expression>this.operands[0]).evaluate();

        if (!(key in this.context)) {
            throw new Error(ExpressionErrors.NO_KEY_FOUND + 'in ' + this.contextId + ': ' + key);
        }

        return this.context[key];
    }
}
