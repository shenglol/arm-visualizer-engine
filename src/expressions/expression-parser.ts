import * as ExpressionErrors from '../constants/expression-errors';
import { ExpressionUtils } from './expression-utils';
import { ExpressionBuilder } from './expression-builder';
import { ExpressionBase, ExpressionTypes } from './expression-base';

export class ExpressionParser {
    private _expBuilder: ExpressionBuilder;
    private _parseCache: { [source: string]: string | Object | any[] };

    constructor() {
        this._expBuilder = new ExpressionBuilder();
        this._parseCache = {};
    }

    parse(source: string): string | Object | any[] {
        source = ExpressionUtils.truncate(source);

        if (this._parseCache[source]) {
            return this._parseCache[source];
        }

        if (!ExpressionUtils.isValid(source)) {
            throw new Error(ExpressionErrors.INVALID_SOURCE);
        }

        if (ExpressionUtils.getType(source) !== ExpressionTypes.Expression) {
            return source;
        }

        let exp = this._expBuilder.buildExpression(source);
        let result = this._parseCache[source] = exp.evaluate();

        return result;
    }
}
