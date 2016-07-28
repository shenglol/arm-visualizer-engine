import { ExpressionParser } from '../../src/expressions/expression-parser';
import { ARMTemplate } from '../../src/template/template';
import { expect } from 'chai';

describe('ExpressionParser', () => {
    let parser: ExpressionParser;

    before(() => {
        parser = new ExpressionParser(null);
    });

    describe('parse()', () => {
        it('should return the same string when a string source present', () => {
            let source = "nic-name";
            let result = parser.parse(source);

            expect(result).to.equal(source);
        });

        it('should parse an expression', () => {
            let source = "[concat('foo', '-', 'bar')]";
            let result = parser.parse(source);

            expect(result).to.equal('foo-bar');
        });

        it('should parse a nested expression', () => {
            let source = "[concat('foo', concat('-', 'bar'))]";
            let result = parser.parse(source);

            expect(result).to.equal('foo-bar');
        });

        it('should parse an expression with context', () => {
            let template = new ARMTemplate();
            template.load(`{
                "$schema": "",
                "contentVersion": "",
                "variables": {
                    "foo": "bar"
                },
                "resources": []
            }`);

            let source = "[variables('foo')]";
            let result = template.parser.parse(source);

            expect(result).to.equal('bar');
        });

        // TODO: more test cases with other expressions
    });
});
