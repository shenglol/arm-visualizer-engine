/**
 * Expression types enum.
 */
export enum ExpressionTypes {
  Expression,
  String,
  Number,
}

/**
 * ARM template expression interface.
 */
export interface Expression {
  operands: (Expression | string)[];
  properties: (Expression | string)[];
  evaluate(): string | Object | any[];
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

  set operands(operands: (Expression | string)[]) {
    this._operands = operands;
  }

  get properties(): (Expression | string)[] {
    return this._properties;
  }

  set properties(properties: (Expression | string)[]) {
    this._properties = properties;
  }

  abstract evaluate(): string | Object | any[];

  toString(): string {
    let className = <string>(<any>this.constructor).name;
    let functionName = className.substr(0, className.length - 10).toLowerCase();
    let expString = functionName + '(';

    for (let operand of this._operands) {
      expString += typeof operand === 'string' ? "'" + operand + "'" : operand.toString();
      expString += ', ';
    }

    if (expString[expString.length - 1] === '(') {
      expString += ')';
    } else {
      expString = expString.substr(0, expString.length - 2) + ')';
    }

    for (let property of this._properties) {
      expString += typeof property === 'string' ? '.' + property : '[' + property.toString() + ']';
    }

    return expString;
  }
}
