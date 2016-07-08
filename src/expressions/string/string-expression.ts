import * as ExpressionErrors from '../../constants/expression-errors';
import { Expression, ExpressionBase } from '../expression-base';

/**
 * StringExpression
 */
export class StringExpression extends ExpressionBase {
  evaluate(): string {
    if (this._operands.length === 0) {
      throw new Error(ExpressionErrors.NO_OPERAND);
    }
    if (this._operands.length > 1) {
      throw new Error(ExpressionErrors.TOO_MANY_OPERANDS);
    }

    if (typeof this._operands[0] === 'string') {
      return <string>this._operands[0];
    }

    return JSON.stringify((<Expression>this._operands[0]).evaluate());
  }
}
