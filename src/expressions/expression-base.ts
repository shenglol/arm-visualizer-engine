import { ExpressionParser } from './expression-parser';
import { Parameters, Variables, Template, ARMTemplate } from '../template';

/**
 * ARM template expression interface.
 */
export interface Expression {
    operands: (Expression | string | number)[];
    properties: (Expression | string | number)[];
    evaluate(): string | number | Object | any[];
}

/**
 * Base class for ARM template expression.
 */
export abstract class ExpressionBase implements Expression {
    protected _operands: (Expression | string | number)[] = [];
    protected _properties: (Expression | string | number)[] = [];

    get operands(): (Expression | string | number)[] {
        return this._operands;
    }

    set operands(operands: (Expression | string | number)[]) {
        this._operands = operands;
    }

    get properties(): (Expression | string | number)[] {
        return this._properties;
    }

    set properties(properties: (Expression | string | number)[]) {
        this._properties = properties;
    }

    abstract evaluate(): string | number | Object | any[];

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

/**
 * Base class for ARM template expression with context
 */
export abstract class ContextualExpressionBase extends ExpressionBase {
    protected context: Parameters | Variables;
    protected parser: ExpressionParser;

    constructor(template: ARMTemplate) {
        super();

        this.parser = template.parser;
        this.setContext(template);
    }

    protected abstract setContext(template: Template): void;
}
