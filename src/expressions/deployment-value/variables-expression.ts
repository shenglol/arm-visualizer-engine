import { ExpressionErrors } from '../../constants';
import { Expression, ContextualExpressionBase } from '../expression-base';
import { Variables, Template, ARMTemplate } from '../../template/';

/**
 * VarialbesExpression
 */
export class VariablesExpression extends ContextualExpressionBase {
    protected context: Variables;

    evaluate(): string | Object | any[] {
        if (this._operands.length === 0) {
            throw new Error(ExpressionErrors.TOO_FEW_OPERANDS);
        }
        if (this._operands.length > 1) {
            throw new Error(ExpressionErrors.TOO_MANY_OPERANDS);
        }

        if (!this.context) {
            throw new Error(ExpressionErrors.NO_CONTEXT + ': variables');
        }

        let key: string = typeof this.operands[0] === 'string'
            ? <string>this.operands[0]
            : <string>(<Expression>this.operands[0]).evaluate();

        if (!(key in this.context)) {
            throw new Error(ExpressionErrors.NO_KEY_FOUND + ': ' + key);
        }

        let value = this.context[key];

        // value could be another expression
        if (typeof value === 'string') {
            return this.parser.parse(value);
        }

        if (typeof value === 'object') {
            for (let prop of this.properties) {
                let key: string = typeof prop === 'string' ? prop : <string>prop.evaluate();
                value = (<any>value)[key];
            }

            if (typeof value === 'string') {
                return this.parser.parse(value);
            }

            return value;
        }

        return value;
    }

    protected setContext(template: Template) {
        this.context = template.variables;
    }
}
