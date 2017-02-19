import { expect } from 'chai';

import {
  ExpressionUtils,
  ExpressionTypes
} from '../../../src';

describe('ExpressionUtils', () => {
  describe('isValid()', () => {
    it('should return false with invalid expression source', () => {
      let source1 = "[concat('a', 'b', parameters('foo')name])]";
      let source2 = "[string)123))]";
      let source3 = "[base64('foo'))]";

      expect(ExpressionUtils.isValid(source1)).to.be.false;
      expect(ExpressionUtils.isValid(source1)).to.be.false;
      expect(ExpressionUtils.isValid(source3)).to.be.false;
    });

    it('should return true with valid expression source', () => {
      let source1 = "[concat('a', 'b', parameters('foo')[name])]";
      let source2 = "[string(123))]";
      let source3 = "[base64('foo')]";

      expect(ExpressionUtils.isValid(source1)).to.be.true;
      expect(ExpressionUtils.isValid(source1)).to.be.true;
      expect(ExpressionUtils.isValid(source3)).to.be.true;
    });
  });

  describe('getType()', () => {
    it('should return Expression type when an expression source present', () => {
      let source = "[concat('a', 'b', parameters('foo')[name])]";

      expect(ExpressionUtils.getType(source)).to.equal(ExpressionTypes.Expression);
    });

    it('should return String type when a string source present', () => {
      let source = "'foo'";

      expect(ExpressionUtils.getType(source)).to.equal(ExpressionTypes.String);
    });

    it('should return Number type when a number source present', () => {
      let source = "123";

      expect(ExpressionUtils.getType(source)).to.equal(ExpressionTypes.Number);
    });
  });

  describe('truncate()', () => {
    it('should not truncate an expression operand', () => {
      let source = "concat('foo', 'bar')";

      expect(ExpressionUtils.truncate(source)).to.equal(source);
    });

    it('should not truncate a number operand', () => {
      let source = "123";

      expect(ExpressionUtils.truncate(source)).to.equal(source);
    });

    it('should truncate operand string operand', () => {
      let source = "[concat('foo', 'bar')]";

      expect(ExpressionUtils.truncate(source)).to.equal("concat('foo', 'bar')");
    });

    it('should trim spaces', () => {
      let source1 = "   concat('foo', 'bar') ";
      let source2 = "   123   ";
      let source3 = "   [concat('foo', 'bar')]  ";

      expect(ExpressionUtils.truncate(source1)).to.equal("concat('foo', 'bar')");
      expect(ExpressionUtils.truncate(source2)).to.equal("123");
      expect(ExpressionUtils.truncate(source3)).to.equal("concat('foo', 'bar')");
    });
  });
});
