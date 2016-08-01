import { ExpressionErrors } from '../../constants';
import { Expression, ExpressionBase } from '../expression-base';
import { Variables, ARMTemplate } from '../../template';

/**
 * ResourceIdExpression
 */
export class ResourceIdExpression extends ExpressionBase {
    evaluate(): string {
        if (this._operands.length < 2) {
            throw new Error(ExpressionErrors.TOO_FEW_OPERANDS);
        }

        let resourceId = '';

        // resourceId function should return an identifier in the following format:
        //     /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/{resourceProviderNamespace}/{resourceType}/{resourceName}
        // Since we don't ask users for their subscriptionId and resourceGroupName,
        // the identifier is returned in the following format instead:
        //     /{subscriptionId}/{resourceGroupName}/{resourceType}/{resourceName}
        // Please note that subscriptionId and resourceGroupName are optional operands
        for (let operand of this.operands) {
            resourceId += '/';
            resourceId += typeof operand === 'string'
                ? <string>operand
                : (<Expression>operand).evaluate();
        }

        return resourceId;
    }
}
