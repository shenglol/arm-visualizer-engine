/// <reference path='../../typings/index.d.ts' />

import * as ExpressionErrors from '../../src/constants/expression-errors';
import { ExpressionUtils } from '../../src/expressions/expression-utils';
import { ExpressionTypes } from '../../src/expressions/expression-base';

describe('ExpressionUtils', () => {

    it('Should return false with invalid expression source', () => {
        let source1 = "[concat('a', 'b', parameters('foo')name])]";
        let source2 = "[string)123))]";
        let source3 = "[base64('foo'))]";

        expect(ExpressionUtils.isValid(source1)).toBeFalsy();
        expect(ExpressionUtils.isValid(source1)).toBeFalsy();
        expect(ExpressionUtils.isValid(source3)).toBeFalsy();
    });

    it('Should return true with valid expression source', () => {
        let source1 = "[concat('a', 'b', parameters('foo')[name])]";
        let source2 = "[string(123))]";
        let source3 = "[base64('foo')]";

        expect(ExpressionUtils.isValid(source1)).toBeTruthy();
        expect(ExpressionUtils.isValid(source1)).toBeTruthy();
        expect(ExpressionUtils.isValid(source3)).toBeTruthy();
    });

    it('Should return correct expression types', () => {
        let source1 = "[concat('a', 'b', parameters('foo')[name])]";
        let source2 = "'foo'";
        let source3 = "123";

        expect(ExpressionUtils.getType(source1)).toEqual(ExpressionTypes.Expression);
        expect(ExpressionUtils.getType(source2)).toEqual(ExpressionTypes.String);
        expect(ExpressionUtils.getType(source3)).toEqual(ExpressionTypes.Number);
    });

    it('Should not truncate non-truncatable strings', () => {
        let source1 = "123";
        let source2 = "concat('foo', 'bar')";

        expect(ExpressionUtils.truncate(source1)).toEqual(source1);
        expect(ExpressionUtils.truncate(source2)).toEqual(source2);
    });

    it('Should truncate operand string', () => {
        let source = "'foo'";

        expect(ExpressionUtils.truncate(source)).toEqual('foo');
    });

    it('Should truncate expression string', () => {
        let source = "[concat('foo', 'bar')]";

        expect(ExpressionUtils.truncate(source)).toEqual("concat('foo', 'bar')");
    });

});
