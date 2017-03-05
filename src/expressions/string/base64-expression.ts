/// <reference types="@types/node" />

import { Expression, ExpressionBase } from '../expression-base';
import { TooFewOperandsError, TooManyOperandsError } from '../../shared';

/**
 * Base64Expression
 * Combines multiple values and returns the concatenated result.
 */
export class Base64Expression extends ExpressionBase {
  evaluate(): string {
    if (this._operands.length === 0) {
      throw new TooFewOperandsError();
    }
    if (this._operands.length > 1) {
      throw new TooManyOperandsError();
    }

    let rawString: string = this._operands[0] instanceof ExpressionBase
      ? <string>(<Expression>this.operands[0]).evaluate()
      : <string>this.operands[0];

    return new Buffer(rawString).toString('base64');
  }
}
