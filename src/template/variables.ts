import { ExpressionContext } from '../expressions';

export interface Variables extends ExpressionContext {
    [variableName: string]: string | Object;
}
