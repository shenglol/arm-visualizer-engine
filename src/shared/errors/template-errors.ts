import * as ErrorMessages from './template-error-messages';

export class MissingTemplatePropertyError extends Error {
    constructor(property: string) {
        super(ErrorMessages.MISSING_TEMPLATE_PROPERTY + ': ' + property);
    }
}

export class DependenciesNotFound extends Error {
    constructor(source: string) {
        super(ErrorMessages.DEPENDENCIES_NOT_FOUND + ' for expression: ' + source);
    }
}

export class DuplicateDependenciesError extends Error {
    constructor(source: string) {
        super(ErrorMessages.DUPLICATE_DEPENDENCIES + ' for expression: ' + source);
    }
}
