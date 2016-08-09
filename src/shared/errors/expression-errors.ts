import * as ErrorMessages from './expression-error-messages';

export class TooFewOperandsError extends Error {
    constructor() {
        super();
        this.message = ErrorMessages.TOO_FEW_OPERANDS;
    }
}

export class TooManyOperandsError extends Error {
    constructor() {
        super();
        this.message = ErrorMessages.TOO_MANY_OPERANDS;
    }
}

export class InvalidOperandTypeError extends Error {
    constructor(operand: string) {
        super();
        this.message = ErrorMessages.INVALID_OPERAND_TYPE + ': ' + operand;
    }
}

export class InvalidExpSourceError extends Error {
    constructor() {
        super();
        this.message = ErrorMessages.INVALID_EXP_SOURCE;
    }
}

export class ExpContextNotFoundError extends Error {
    constructor(context: string) {
        super();
        this.message = ErrorMessages.EXP_CONTEXT_NOT_FOUND + ': ' + context;
    }
}

export class PropertyNotFoundError extends Error {
    constructor(property: string) {
        super();
        this.message = ErrorMessages.PROPERTY_NOT_FOUND + ': ' + property;
    }
}
