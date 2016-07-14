import * as Expressions from './expressions';
import * as ExpressionErrors from '../constants/expression-errors';
import { ExpressionUtils } from './expression-utils';
import { Expression, ExpressionTypes } from './expression-base';

const DOT = '.';
const SPACE = ' ';
const COMMA = ',';
const OPEN_BRACKET = '(';
const CLOSED_BRACKET = ')';
const OPEN_SQURE_BRACKET = '[';
const CLOSED_SQURE_BRACKET = ']';

/**
 * ExpressionBuilder
 * Build expression from an expression source string
 */
export class ExpressionBuilder {
    buildExpression(source: string): Expression {
        let openIndex = this.getOpenIndex(source);
        let closedIndex = this.getClosedIndex(source);

        let expName = this.getExpressionName(source, openIndex);
        let operandsSource = this.getOperandsSource(source, openIndex, closedIndex);
        let propsSource = this.getPropsSourrce(source, closedIndex);

        let exp: Expression = new (<any>Expressions)[expName]();
        exp.operands = this.buildOperands(operandsSource);
        exp.properties = this.buildProperties(propsSource);

        return exp;
    }

    private buildOperands(operandsSource: string): (Expression | string)[] {
        let operands: (Expression | string)[] = [];
        let buffer = '';
        let count = 0;

        for (let ch of operandsSource) {
            switch (ch) {
                case OPEN_BRACKET:
                case OPEN_SQURE_BRACKET:
                    count++;
                    buffer += ch;
                    break;

                case CLOSED_BRACKET:
                case CLOSED_SQURE_BRACKET:
                    count--;
                    buffer += ch;
                    break;

                case COMMA:
                    if (count === 0) {
                        buffer = ExpressionUtils.truncate(buffer);
                        if (ExpressionUtils.getType(buffer) === ExpressionTypes.Expression) {
                            operands.push(this.buildExpression(buffer));
                        } else {
                            operands.push(buffer);
                        }
                        buffer = '';
                    } else {
                        buffer += ch;
                    }
                    break;

                default:
                    buffer += ch;
                    break;
            }
        }

        if (buffer.length > 0) {
            buffer = ExpressionUtils.truncate(buffer);
            if (ExpressionUtils.getType(buffer) === ExpressionTypes.Expression) {
                operands.push(this.buildExpression(buffer));
            } else {
                operands.push(buffer);
            }
        }

        return operands;
    }

    private buildProperties(propsSource: string): (Expression | string)[] {
        let props: (Expression | string)[] = [];
        let buffer = '';
        let count = 0;

        for (let ch of propsSource) {
            switch (ch) {
                case DOT:
                    if (count === 0) {
                        if (buffer.length > 0) {
                            props.push(buffer);
                            buffer = '';
                        }
                    } else {
                        buffer += ch;
                    }
                    break;

                case OPEN_SQURE_BRACKET:
                    count++;
                    if (count === 1) {
                        if (buffer.length > 0) {
                            props.push(buffer);
                        }
                        buffer = '';
                    } else {
                        buffer += ch;
                    }
                    break;

                case CLOSED_SQURE_BRACKET:
                    count--;
                    if (count === 0) {
                        props.push(this.buildExpression(buffer));
                        buffer = '';
                    } else {
                        buffer += ch;
                    }
                    break;

                default:
                    buffer += ch;
                    break;
            }
        }

        if (buffer.length > 0) {
            props.push(buffer);
        }

        return props;
    }

    private getOpenIndex(source: string) {
        return source.indexOf('(');
    }

    private getClosedIndex(source: string) {
        let count = 0;

        for (let index = 0; index < source.length; index++) {
            let ch = source[index];
            if (ch === '(') {
                count++;
            }
            if (ch === ')') {
                count--;
                if (count === 0) {
                    return index;
                }
            }
        }

        return -1;
    }

    private getExpressionName(source: string, openIndex: number) {
        let operator = source.substring(0, openIndex);
        let expName = operator[0].toUpperCase() + operator.substring(1) + 'Expression';

        return expName;
    }

    private getOperandsSource(source: string, openIndex: number, closedIndex: number) {
        let operandsSource = source.substring(openIndex + 1, closedIndex);

        return operandsSource ? operandsSource : '';
    }

    private getPropsSourrce(source: string, closedIndex: number) {
        let propsSource = source.substring(closedIndex + 1);

        return propsSource ? propsSource : '';
    }
}
