import { expect } from 'chai';

import { ExpressionBuilder, ExpressionParser } from '../../src';

describe('ExpressionParser', () => {
    let parser: ExpressionParser;

    beforeEach(() => {
        parser = new ExpressionParser(new ExpressionBuilder(null));
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
    });
});
