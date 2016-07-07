/**
 * ARM template expression interface.
 */
export interface Expression {
  operands: (Expression | string)[];
  properties: (Expression | string)[];
  evaluate(): string;
}

/**
 * Base class for ARM template expression.
 */
export abstract class ExpressionBase implements Expression {
  protected _operands: (Expression | string)[] = [];
  protected _properties: (Expression | string)[] = [];

  get operands(): (Expression | string)[] {
    return this._operands;
  }

  get properties(): (Expression | string)[] {
    return this._properties;
  }

  abstract evaluate(): string;

  toString(): string {
    let className = <string>(<any>this.constructor).name;
    let functionName = className.substr(0, className.length - 10).toLowerCase();
    let expString = functionName + '(';

    for (let operand of this._operands) {
      expString += typeof operand === 'string' ? "'" + operand + "'" : operand.toString();
      expString += ', ';
    }
    expString = expString.substr(0, expString.length - 2) + ')';

    for (let property of this._properties) {
      expString += typeof property === 'string' ? '.' + property : '[' + property.toString() + ']';
    }

    return expString;
  }
}
