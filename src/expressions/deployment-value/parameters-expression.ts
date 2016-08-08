import { Expression, ExpressionBase, ContextualExpressionBase } from '../expression-base';
import { Parameters, Template } from '../../template';
import {
    TooFewOperandsError,
    TooManyOperandsError,
    ExpContextNotFoundError,
    PropertyNotFoundError
} from '../../shared';

/**
 * ParametersExpression
 */
export class ParametersExpression extends ContextualExpressionBase {
    evaluate(): string | Object | any[] {

        if (this._operands.length === 0) {
            throw new TooFewOperandsError();
        }
        if (this._operands.length > 1) {
            throw new TooManyOperandsError();
        }

        let parameters = this.engine.template.parameters;

        if (!parameters) {
            throw new ExpContextNotFoundError('parameters');
        }

        let operand = this.operands[0];
        let paramName: string = operand instanceof ExpressionBase
            ? <string>operand.evaluate() : <string>operand;

        if (!(paramName in parameters)) {
            throw new PropertyNotFoundError(paramName);
        }

        let parameter = parameters[paramName].value || parameters[paramName].defaultValue;

        if (!parameter && parameter !== '') {
            return "parameters('" + paramName + "')";
        }

        // parameter can be another expression
        if (typeof parameter === 'string') {
            return this.engine.resolveExpression(parameter);
        }

        if (typeof parameter === 'object') {
            for (let prop of this.properties) {
                prop = prop instanceof ExpressionBase ? <string | number>prop.evaluate() : prop;
                parameter = (<any>parameter)[<string | number>prop];

                if (!parameter) {
                    throw new PropertyNotFoundError(<string>prop);
                }
            }

            // parameter can be another expression
            if (typeof parameter === 'string') {
                return this.engine.resolveExpression(parameter);
            }

            return parameter;
        }

        return parameter;
    }
}
