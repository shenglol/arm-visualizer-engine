import { expect } from 'chai';

import {
    ExpressionErrors,
    Expression,
    ContextualExpressionBase,
    ExpressionContext,
    ExpressionBuilder,
    ExpressionParser,
    ARMTemplate
} from '../../src';

describe('ExpressionBuilder', () => {
    let builder: ExpressionBuilder;

    before(() => {
        builder = new ExpressionBuilder(null);
    });

    describe('buildExpression()', () => {
        it('should build an expression with no operands', () => {
            let source = "concat()";
            let exp = builder.buildExpression(source);

            expect(exp.toString()).to.equal('concat()');
        });

        it('should build an expression', () => {
            let source = "concat('foo', 'bar')";
            let exp = builder.buildExpression(source);

            expect(exp.toString()).to.equal(source);
        });

        it('should build a nested expression', () => {
            let source = "concat('foo', 'bar', base64(concat('a', 'b')))";
            let exp = builder.buildExpression(source);

            expect(exp.toString()).to.equal(source);
        });

        it('should build an expression with properties', () => {
            let source = "concat('foo', 'bar').a.b.c";
            let exp = builder.buildExpression(source);

            expect(exp.properties.length).to.equal(3);
            expect(exp.toString()).to.equal(source);
        });

        it('should build an expression with nested properties', () => {
            let source = "concat('foo', 'bar')[string('a').b].c";
            let exp = builder.buildExpression(source);

            expect(exp.toString()).to.equal(source);
        });

        it('should build a nested expression with nested properties', () => {
            let source = "concat('a', concat('b', 'c').d[concat('foo', 'bar').e[base64('m')]])[concat('x', 'y')].f";
            let exp = builder.buildExpression(source);

            expect(exp.toString()).to.equal(source);
        });
    });
});
