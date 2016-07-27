import * as ExpressionErrors from '../constants/expression-errors';
import { ExpressionUtils } from './expression-utils';
import { ExpressionBuilder } from './expression-builder';
import { Expression, ExpressionTypes } from './expression-base';
import { Contextual, ExpressionContext } from './expression-context';
import { Template } from '../template/template';

export class ExpressionParser {
    private expBuilder: ExpressionBuilder;
    private parseCache: { [source: string]: string | Object | any[] };

    constructor(template: Template) {
        this.expBuilder = new ExpressionBuilder(template);
        this.parseCache = {};
    }

    parse(source: string): string | Object | any[] {
        source = ExpressionUtils.truncate(source);

        if (this.parseCache[source]) {
            return this.parseCache[source];
        }

        if (!ExpressionUtils.isValid(source)) {
            throw new Error(ExpressionErrors.INVALID_SOURCE);
        }

        if (ExpressionUtils.getType(source) !== ExpressionTypes.Expression) {
            return source;
        }

        let exp = this.expBuilder.buildExpression(source);
        let result = this.parseCache[source] = exp.evaluate();

        return result;
    }
}
