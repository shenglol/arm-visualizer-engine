import { Expression, ExpressionBase } from '../expression-base';
import { TooFewOperandsError, TooManyOperandsError } from '../../shared';

/**
 * StringExpression
 */
export class StringExpression extends ExpressionBase {
  evaluate(): string {
    if (this.operands.length === 0) {
      throw new TooFewOperandsError();
    }
    if (this.operands.length > 1) {
      throw new TooManyOperandsError();
    }

    if (this.operands[0] instanceof ExpressionBase) {
      return JSON.stringify((<Expression>this.operands[0]).evaluate());
    }

    return (<string | number>this.operands[0]).toString();
  }
}
