import { InvalidExpSourceError } from '../shared';
import { Expression } from './expression-base';
import { ExpressionTypes } from './expression-types';
import { ExpressionBuilder } from './expression-builder';
import { ExpressionUtils } from '../shared';
import { TemplateEngine } from '../template';

export class ExpressionParser {
    private parseCache: { [source: string]: string | Object | any[] };

    constructor(private builder: ExpressionBuilder) {
        this.parseCache = {};
    }

    parse(source: string): string | Object | any[] {
        source = ExpressionUtils.truncate(source);

        if (this.parseCache[source]) {
            return this.parseCache[source];
        }

        if (!ExpressionUtils.isValid(source)) {
            throw new InvalidExpSourceError();
        }

        if (ExpressionUtils.getType(source) !== ExpressionTypes.Expression) {
            return source;
        }

        let exp = this.builder.buildExpression(source);
        let result = this.parseCache[source] = exp.evaluate();

        return result;
    }

    clearCache() {
        this.parseCache = {};
    }
}
