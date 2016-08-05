import { ExpressionErrors } from '../../constants';
import { Expression, ContextualExpressionBase } from '../expression-base';
import { TemplateEngine } from '../../template/';

/**
 * VarialbesExpression
 */
export class VariablesExpression extends ContextualExpressionBase {
    evaluate(): string | Object | any[] {
        if (this._operands.length === 0) {
            throw new Error(ExpressionErrors.TOO_FEW_OPERANDS);
        }
        if (this._operands.length > 1) {
            throw new Error(ExpressionErrors.TOO_MANY_OPERANDS);
        }

        let variables = this.engine.template.variables;

        if (!variables) {
            throw new Error(ExpressionErrors.NO_CONTEXT + ': variables');
        }

        let key: string = typeof this.operands[0] === 'string'
            ? <string>this.operands[0]
            : <string>(<Expression>this.operands[0]).evaluate();

        if (!(key in variables)) {
            throw new Error(ExpressionErrors.NO_KEY_FOUND + ': ' + key);
        }

        let value = variables[key];

        // value could be another expression
        if (typeof value === 'string') {
            return this.engine.resolveExpression(value);
        }

        if (typeof value === 'object') {
            for (let prop of this.properties) {
                let key = typeof prop === 'string' || typeof prop === 'number'
                    ? prop : <string | number>prop.evaluate();
                value = (<any>value)[key];
            }

            if (typeof value === 'string') {
                return this.engine.resolveExpression(value);
            }

            return value;
        }

        return value;
    }
}
