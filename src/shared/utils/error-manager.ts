
export class ErrorManager {
  private _expressionErrors: { [source: string]: string[] };
  private _templateErrors: string[];

  get expressionErrors(): { [source: string]: string[] } {
    return this._expressionErrors;
  }

  get templateErrors(): string[] {
    return this._templateErrors;
  }

  constructor() {
    this.clearErrors();
  }

  addExpressionError(source: string, error: Error) {
    if (!this.expressionErrors[source]) {
      this.expressionErrors[source] = [error.message];
    } else {
      if (!(error.message in this.expressionErrors[source])) {
        this.expressionErrors[source].push(error.message);
      }
    }
  }

  addTemplateError(error: Error) {
    if (!(error.message in this.templateErrors)) {
      this.templateErrors.push(error.message);
    }
  }

  clearErrors() {
    this.clearExpressionErrors();
    this.clearTemplateErrors();
  }

  clearExpressionErrors() {
    this._expressionErrors = {};
  }

  clearTemplateErrors() {
    this._templateErrors = [];
  }
}
