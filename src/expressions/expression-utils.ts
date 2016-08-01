import { ExpressionErrors } from '../constants';
import { ExpressionTypes } from './expression-types';

export class ExpressionUtils {
    // TODO: Create a validator
    static isValid(source: string): boolean {
        let open: string = '[(';
        let closed: string = '])';
        let stack: number[] = [];

        for (let ch of source) {
            let openIndex = open.indexOf(ch);
            let closedIndex = closed.indexOf(ch);

            if (openIndex > -1) {
                stack.push(openIndex);
            }

            if (closedIndex > -1
                && (stack.length === 0 || stack.pop() !== closedIndex)) {
                return false;
            }
        }

        return stack.length === 0;
    }

    static getType(source: string): ExpressionTypes {
        let expType: ExpressionTypes;

        if (source.indexOf('(') > 0 && source.indexOf(')') > 1) {
            expType = ExpressionTypes.Expression;
        } else if (!isNaN(+source)) {
            expType = ExpressionTypes.Number;
        } else {
            expType = ExpressionTypes.String;
        }

        return expType;
    }

    static truncate(source: string): string {
        source = source.trim();

        if (source.length < 1) {
            return source;
        }

        let first: string = source[0];
        let last: string = source[source.length - 1];

        if ((first === "'" && last === "'") || (first === '[' && last === ']')) {
            return source.substr(1, source.length - 2);
        }

        return source;
    }

}
