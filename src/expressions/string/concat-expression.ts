import { ExpressionBase } from '../expression-base';
import { InvalidOperandTypeError } from '../../shared';

/**
 * Combines multiple values and returns the concatenated result.
 */
export class ConcatExpression extends ExpressionBase {
  evaluate(): string {
    let result = '';

    for (let operand of this._operands) {
        if (typeof operand === 'number') {
            throw new InvalidOperandTypeError(operand.toString());
        } else {
            result += typeof operand === 'string' ? operand : operand.evaluate();
        }
    }

    return result;
  }
}
