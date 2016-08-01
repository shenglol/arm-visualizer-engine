import { Expression, ExpressionBase } from '../../src';
import { expect } from 'chai';

class MockExpression extends ExpressionBase {
    evaluate(): string {
        return '';
    }
}

describe('ExpressionBase', () => {
    let exp: Expression;

    beforeEach(() => {
        exp = new MockExpression();
    });

    describe('toString()', () => {
        it('should convert a simple expression to string', () => {
            exp.operands.push('foo');
            exp.operands.push(' ');
            exp.operands.push(1);

            expect(exp.toString()).to.equal("mock('foo', ' ', 1)");
        });

        it('should convert a nested expression to string', () => {
            let operand: Expression = new MockExpression();
            operand.operands.push(' ');
            operand.operands.push('bar');

            exp.operands.push('foo');
            exp.operands.push(operand);

            expect(exp.toString()).to.equal("mock('foo', mock(' ', 'bar'))");
        });

        it('should convert a simple expression with properties to string', () => {
            exp.operands.push('foo');
            exp.properties.push('a');
            exp.properties.push('b');

            expect(exp.toString()).to.equal("mock('foo').a.b");
        });

        it('should convert a expression with nested properties to string', () => {
            let prop: Expression = new MockExpression();
            prop.operands.push('bar');

            exp.operands.push('foo');
            exp.properties.push(prop);
            exp.properties.push('a');

            expect(exp.toString()).to.equal("mock('foo')[mock('bar')].a");
        });

        it('should convert a nested expression with nested properties to string', () => {
            let nestedProp: Expression = new MockExpression();
            nestedProp.operands.push('foo');
            nestedProp.operands.push('bar');

            let operand: Expression = new MockExpression();
            operand.operands.push('b');
            operand.operands.push('c');
            operand.properties.push('m');
            operand.properties.push(nestedProp);

            let prop: Expression = new MockExpression();
            prop.operands.push('x');
            prop.operands.push('y');

            exp.operands.push('a');
            exp.operands.push(operand);
            exp.properties.push(prop);
            exp.properties.push('n');

            expect(exp.toString()).to.equal(
                "mock('a', mock('b', 'c').m[mock('foo', 'bar')])[mock('x', 'y')].n");
        });
    });
});

