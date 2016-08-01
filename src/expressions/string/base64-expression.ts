import { ExpressionErrors } from '../../constants';
import { Expression, ExpressionBase } from '../expression-base';

/**
 * Combines multiple values and returns the concatenated result.
 */
export class Base64Expression extends ExpressionBase {
  evaluate(): string {
    if (this._operands.length === 0) {
      throw new Error(ExpressionErrors.NO_OPERAND);
    }
    if (this._operands.length > 1) {
      throw new Error(ExpressionErrors.TOO_MANY_OPERANDS);
    }

    let rawString: string = this._operands[0] instanceof ExpressionBase
      ? <string>(<Expression>this._operands[0]).evaluate()
      : <string>this._operands[0];

    return new Buffer(rawString).toString('base64');
  }
}
