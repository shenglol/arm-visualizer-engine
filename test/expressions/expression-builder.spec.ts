/// <reference path='../../typings/index.d.ts' />

import * as ExpressionErrors from '../../src/constants/expression-errors';
import * as Expressions from '../../src/expressions/expressions';
import { Expression, ExpressionBase } from  '../../src/expressions/expression-base';
import { ExpressionBuilder } from '../../src/expressions/expression-builder';

describe('ExpressionBuilder', () => {

    let builder: ExpressionBuilder;

    beforeAll(() => {
        builder = new ExpressionBuilder();
    });

    it('Should build an expression with no operands', () => {
        let source = "concat()";
        let exp = builder.buildExpression(source);

        expect(exp.toString()).toEqual('concat()');
    });

    it('Should build an expression', () => {
        let source = "concat('foo', 'bar')";
        let exp = builder.buildExpression(source);

        expect(exp.toString()).toEqual(source);
    });

    it('Should build a nested expression', () => {
        let source = "concat('foo', 'bar', base64(concat('a', 'b')))";
        let exp = builder.buildExpression(source);

        expect(exp.toString()).toEqual(source);
    });

    it('Should build an expression with properties', () => {
        let source = "concat('foo', 'bar').a.b.c";
        let exp = builder.buildExpression(source);

        expect(exp.properties.length).toEqual(3);
        expect(exp.toString()).toEqual(source);
    });

    it('Should build an expression with nested properties', () => {
        let source = "concat('foo', 'bar')[string('a').b].c";
        let exp = builder.buildExpression(source);

        expect(exp.toString()).toEqual(source);
    });

    it('Should build a nested expression with nested properties', () => {
        let source = "concat('a', concat('b', 'c').d[concat('foo', 'bar').e[base64('m')]])[concat('x', 'y')].f";
        let exp = builder.buildExpression(source);

        expect(exp.toString()).toEqual(source);
    });

});
