import * as ErrorMessages from './template-error-messages';

export class MissingTemplatePropertyError extends Error {
  constructor(property: string) {
    super();
    this.message = ErrorMessages.MISSING_TEMPLATE_PROPERTY + ': ' + property;
  }
}

export class DependencyNotFoundError extends Error {
  constructor(source: string) {
    super();
    this.message = ErrorMessages.DEPENDENCY_NOT_FOUND + ' for expression: ' + source;
  }
}

export class DuplicateDependenciesError extends Error {
  constructor(source: string) {
    super();
    this.message = ErrorMessages.DUPLICATE_DEPENDENCIES + ' for expression: ' + source;
  }
}
