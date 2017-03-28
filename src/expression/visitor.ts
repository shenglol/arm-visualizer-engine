import * as nodes from "./nodes";

export abstract class Visitor {
  constructor() { }

  public visitNode(node: nodes.Node): void {
    if (!node) { return; };

    switch (node.kind) {
      case nodes.NodeKind.Identifier:
        this.visitIdentifier(node as nodes.Identifier);
        break;

      case nodes.NodeKind.IntegerLiteral:
        this.visitIntegerLiteral(node as nodes.IntegerLiteral);
        break;

      case nodes.NodeKind.StringLiteral:
        this.visitStringLiteral(node as nodes.StringLiteral);
        break;

      case nodes.NodeKind.ObjectLiteral:
        this.visitObjectLiteral(node as nodes.ObjectLiteral);
        break;

      case nodes.NodeKind.ArrayLiteral:
        this.visitArrayLiteral(node as nodes.ArrayLiteral);
        break;

      case nodes.NodeKind.AddFunction:
        this.visitAddFunction(node as nodes.AddFunction);
        break;

      case nodes.NodeKind.CopyIndexFunction:
        this.visitCopyIndexFunction(node as nodes.CopyIndexFunction);
        break;

      case nodes.NodeKind.DivFunction:
        this.visitDivFunction(node as nodes.DivFunction);
        break;

      case nodes.NodeKind.IntFunction:
        this.visitIntFunction(node as nodes.IntFunction);
        break;

      case nodes.NodeKind.ModFunction:
        this.visitModFunction(node as nodes.ModFunction);
        break;

      case nodes.NodeKind.MulFunction:
        this.visitMulFunction(node as nodes.MulFunction);
        break;

      case nodes.NodeKind.SubFunction:
        this.visitSubFunction(node as nodes.SubFunction);
        break;

      case nodes.NodeKind.Base64Function:
        this.visitBase64Function(node as nodes.Base64Function);
        break;

      case nodes.NodeKind.PadLeftFunction:
        this.visitPadLeftFunction(node as nodes.PadLeftFunction);
        break;

      case nodes.NodeKind.ReplaceFunction:
        this.visitReplaceFunction(node as nodes.ReplaceFunction);
        break;

      case nodes.NodeKind.SplitFunction:
        this.visitSplitFunction(node as nodes.SplitFunction);
        break;

      case nodes.NodeKind.StringFunction:
        this.visitStringFunction(node as nodes.StringFunction);
        break;

      case nodes.NodeKind.SubstringFunction:
        this.visitSubstringFunction(node as nodes.SubstringFunction);
        break;

      case nodes.NodeKind.ToLowerFunction:
        this.visitToLowerFunction(node as nodes.ToLowerFunction);
        break;

      case nodes.NodeKind.ToUpperFunction:
        this.visitToUpperFunction(node as nodes.ToUpperFunction);
        break;

      case nodes.NodeKind.TrimFunction:
        this.visitTrimFunction(node as nodes.TrimFunction);
        break;

      case nodes.NodeKind.UniqueStringFunction:
        this.visitUniqueStringFunction(node as nodes.UniqueStringFunction);
        break;

      case nodes.NodeKind.UriFunction:
        this.visitUriFunction(node as nodes.UriFunction);
        break;

      case nodes.NodeKind.ConcatFunction:
        this.visitConcatFunction(node as nodes.ConcatFunction);
        break;

      case nodes.NodeKind.LengthFunction:
        this.visitLengthFunction(node as nodes.LengthFunction);
        break;

      case nodes.NodeKind.SkipFunction:
        this.visitSkipFunction(node as nodes.SkipFunction);
        break;

      case nodes.NodeKind.TakeFunction:
        this.visitTakeFunction(node as nodes.TakeFunction);
        break;

      case nodes.NodeKind.DeploymentFunction:
        this.visitDeploymentFunction(node as nodes.DeploymentFunction);
        break;

      case nodes.NodeKind.ParametersFunction:
        this.visitParametersFunction(node as nodes.ParametersFunction);
        break;

      case nodes.NodeKind.VariablesFunction:
        this.visitVariablesFunction(node as nodes.VariablesFunction);
        break;

      case nodes.NodeKind.ListKeysFunction:
        this.visitListKeysFunction(node as nodes.ListKeysFunction);
        break;

      case nodes.NodeKind.ListValueFunction:
        this.visitListValueFunction(node as nodes.ListValueFunction);
        break;

      case nodes.NodeKind.ProvidersFunction:
        this.visitProvidersFunction(node as nodes.ProvidersFunction);
        break;

      case nodes.NodeKind.ReferenceFunction:
        this.visitReferenceFunction(node as nodes.ReferenceFunction);
        break;

      case nodes.NodeKind.ResourceGroupFunction:
        this.visitResourceGroupFunction(node as nodes.ResourceGroupFunction);
        break;

      case nodes.NodeKind.ResourceIdFunction:
        this.visitResourceIdFunction(node as nodes.ResourceIdFunction);
        break;

      case nodes.NodeKind.SubscriptionFunction:
        this.visitSubscriptionFunction(node as nodes.SubscriptionFunction);
        break;

      default:
        break;
    }
  }

  protected visitIdentifier(node: nodes.Identifier): void { }

  protected visitIntegerLiteral(node: nodes.IntegerLiteral): void { }

  protected visitStringLiteral(node: nodes.StringLiteral): void { }

  protected visitObjectLiteral(node: nodes.ObjectLiteral): void { }

  protected visitArrayLiteral(node: nodes.ArrayLiteral): void { }

  protected visitAddFunction(node: nodes.AddFunction): void {
    this.visitNode(node.operand1);
    this.visitNode(node.operand2);
  }

  protected visitCopyIndexFunction(node: nodes.CopyIndexFunction): void {
    this.visitNode(node.offset);
  }

  protected visitDivFunction(node: nodes.DivFunction): void {
    this.visitNode(node.operand1);
    this.visitNode(node.operand2);
  }

  protected visitIntFunction(node: nodes.IntFunction): void {
    this.visitNode(node.valueToConvert);
  }

  protected visitModFunction(node: nodes.ModFunction): void {
    this.visitNode(node.operand1);
    this.visitNode(node.operand2);
  }

  protected visitMulFunction(node: nodes.MulFunction): void {
    this.visitNode(node.operand1);
    this.visitNode(node.operand2);
  }

  protected visitSubFunction(node: nodes.SubFunction): void {
    this.visitNode(node.operand1);
    this.visitNode(node.operand2);
  }

  protected visitBase64Function(node: nodes.Base64Function): void {
    this.visitNode(node.inputStr);
  }

  protected visitPadLeftFunction(node: nodes.PadLeftFunction): void {
    this.visitNode(node.valueToPad);
    this.visitNode(node.totalLength);
    this.visitNode(node.paddingCharacter);
  }

  protected visitReplaceFunction(node: nodes.ReplaceFunction): void {
    this.visitNode(node.originalString);
    this.visitNode(node.oldString);
    this.visitNode(node.newString);
  }

  protected visitSplitFunction(node: nodes.SplitFunction): void {
    this.visitNode(node.inputString);
    this.visitNode(node.delimiter);
  }

  protected visitStringFunction(node: nodes.StringFunction): void {
    this.visitNode(node.valueToConvert);
  }

  protected visitSubstringFunction(node: nodes.SubstringFunction): void {
    this.visitNode(node.stringToParse);
    this.visitNode(node.startIndex);
    this.visitNode(node.length);
  }

  protected visitToLowerFunction(node: nodes.ToLowerFunction): void {
    this.visitNode(node.stringToChange);
  }

  protected visitToUpperFunction(node: nodes.ToUpperFunction): void {
    this.visitNode(node.stringToChange);
  }

  protected visitTrimFunction(node: nodes.TrimFunction): void {
    this.visitNode(node.stringToTrim);
  }

  protected visitUniqueStringFunction(node: nodes.UniqueStringFunction): void {
    this.visitNode(node.baseString);
    for (let str of node.extraStrings) {
      this.visitNode(str);
    }
  }

  protected visitUriFunction(node: nodes.UriFunction): void {
    this.visitNode(node.baseUri);
    this.visitNode(node.relativeUri);
  }

  protected visitConcatFunction(node: nodes.ConcatFunction): void {
    for (let element of node.elementsToConcat) {
      this.visitNode(element);
    }
  }

  protected visitLengthFunction(node: nodes.LengthFunction): void {
    this.visitNode(node.element);
  }

  protected visitSkipFunction(node: nodes.SkipFunction): void {
    this.visitNode(node.originalValue);
    this.visitNode(node.numberToSkip);
  }

  protected visitTakeFunction(node: nodes.TakeFunction): void {
    this.visitNode(node.originalValue);
    this.visitNode(node.numberToTake);
  }

  protected visitDeploymentFunction(node: nodes.DeploymentFunction): void {
    for (let prop of node.properties) {
      this.visitNode(prop);
    }
  }

  protected visitParametersFunction(node: nodes.ParametersFunction): void {
    this.visitNode(node.parameterName);
    for (let prop of node.properties) {
      this.visitNode(prop);
    }
  }

  protected visitVariablesFunction(node: nodes.VariablesFunction): void {
    this.visitNode(node.variableName);
    for (let prop of node.properties) {
      this.visitNode(prop);
    }
  }

  protected visitListKeysFunction(node: nodes.ListKeysFunction): void {
    this.visitNode(node.resourceNameOrId);
    this.visitNode(node.apiVersion);
    for (let prop of node.properties) {
      this.visitNode(prop);
    }
  }

  protected visitListValueFunction(node: nodes.ListValueFunction): void {
    this.visitNode(node.resourceNameOrId);
    this.visitNode(node.apiVersion);
    for (let prop of node.properties) {
      this.visitNode(prop);
    }
  }

  protected visitProvidersFunction(node: nodes.ProvidersFunction): void {
    this.visitNode(node.providerNamespace);
    this.visitNode(node.resourceType);
    for (let prop of node.properties) {
      this.visitNode(prop);
    }
  }

  protected visitReferenceFunction(node: nodes.ReferenceFunction): void {
    this.visitNode(node.resourceNameOrId);
    this.visitNode(node.apiVersion);
    for (let prop of node.properties) {
      this.visitNode(prop);
    }
  }

  protected visitResourceGroupFunction(node: nodes.ResourceGroupFunction): void {
    for (let prop of node.properties) {
      this.visitNode(prop);
    }
  }

  protected visitResourceIdFunction(node: nodes.ResourceIdFunction): void {
    this.visitNode(node.first);
    this.visitNode(node.second);
    for (let item of node.rest) {
      this.visitNode(item);
    }
  }

  protected visitSubscriptionFunction(node: nodes.SubscriptionFunction): void {
    for (let prop of node.properties) {
      this.visitNode(prop);
    }
  }
}
