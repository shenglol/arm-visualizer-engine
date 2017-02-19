import { Expression, ExpressionBase, ContextualExpressionBase } from '../expression-base';
import {
  TooFewOperandsError,
  TooManyOperandsError,
  ExpContextNotFoundError,
  PropertyNotFoundError
} from '../../shared';

/**
 * VarialbesExpression
 */
export class VariablesExpression extends ContextualExpressionBase {
  evaluate(): string | Object | any[] {
    if (this._operands.length === 0) {
      throw new TooFewOperandsError();
    }
    if (this._operands.length > 1) {
      throw new TooManyOperandsError();
    }

    let variables = this.engine.template.variables;

    if (!variables) {
      throw new ExpContextNotFoundError('variables');
    }

    let operand = this.operands[0];
    let varName: string = operand instanceof ExpressionBase
      ? <string>operand.evaluate() : <string>operand;

    if (!(varName in variables)) {
      throw new PropertyNotFoundError(varName);
    }

    let variable = variables[varName];

    // value can be another expression
    if (typeof variable === 'string') {
      return this.engine.resolveExpression(variable);
    }

    if (typeof variable === 'object') {
      for (let prop of this.properties) {
        prop = prop instanceof ExpressionBase ? <string | number>prop.evaluate() : prop;
        variable = (<any>variable)[<string | number>prop];

        if (!variable) {
          throw new PropertyNotFoundError(<string>prop);
        }
      }

      // value can be another expression
      if (typeof variable === 'string') {
        return this.engine.resolveExpression(variable);
      }

      return variable;
    }

    return variable;
  }
}
