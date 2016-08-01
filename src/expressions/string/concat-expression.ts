import { ExpressionErrors } from '../../constants';
import { ExpressionBase } from '../expression-base';

/**
 * Combines multiple values and returns the concatenated result.
 */
export class ConcatExpression extends ExpressionBase {
  evaluate(): string {
    let result = '';

    for (let operand of this._operands) {
        if (typeof operand === 'number') {
            throw new Error(ExpressionErrors.INVALID_OPERAND_TYPE);
        } else {
            result += typeof operand === 'string' ? operand : operand.evaluate();
        }
    }

    return result;
  }
}
