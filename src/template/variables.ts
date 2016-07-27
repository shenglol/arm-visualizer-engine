import { ExpressionContext } from '../expressions/expression-context';

export interface Variables extends ExpressionContext {
    [variableName: string]: string | Object;
}
