import * as ErrorMessages from './expression-error-messages';

export class TooFewOperandsError extends Error {
    constructor() {
        super(ErrorMessages.TOO_FEW_OPERANDS);
    }
}

export class TooManyOperandsError extends Error {
    constructor() {
        super(ErrorMessages.TOO_MANY_OPERANDS);
    }
}

export class InvalidOperandTypeError extends Error {
    constructor() {
        super(ErrorMessages.INVALID_OPERAND_TYPE);
    }
}

export class InvalidExpSourceError extends Error {
    constructor() {
        super(ErrorMessages.INVALID_EXP_SOURCE);
    }
}

export class ExpContextNotFoundError extends Error {
    constructor(context: string) {
        super(ErrorMessages.EXP_CONTEXT_NOT_FOUND + ': ' + context);
    }
}

export class PropertyNotFoundError extends Error {
    constructor(property: string) {
        super(ErrorMessages.PROPERTY_NOT_FOUND + ': ' + property);
    }
}
