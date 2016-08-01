import { ExpressionErrors } from '../constants';
import { Expression, ExpressionTypes } from './expression-base';
import { ExpressionBuilder } from './expression-builder';
import { ExpressionUtils } from './expression-utils';
import { ARMTemplate } from '../template';

export class ExpressionParser {
    private expBuilder: ExpressionBuilder;
    private parseCache: { [source: string]: string | Object | any[] };

    constructor(template: ARMTemplate) {
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
