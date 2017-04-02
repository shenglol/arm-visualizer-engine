import * as nodes from "./nodes";

export abstract class Visitor {
  constructor() { }

  public visit(node: nodes.Node): void {
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

  public visitIdentifier(node: nodes.Identifier): void { }

  public visitIntegerLiteral(node: nodes.IntegerLiteral): void { }

  public visitStringLiteral(node: nodes.StringLiteral): void { }

  public visitObjectLiteral(node: nodes.ObjectLiteral): void { }

  public visitArrayLiteral(node: nodes.ArrayLiteral): void { }

  public visitAddFunction(node: nodes.AddFunction): void {
    this.visit(node.operand1);
    this.visit(node.operand2);
  }

  public visitCopyIndexFunction(node: nodes.CopyIndexFunction): void {
    this.visit(node.offset);
  }

  public visitDivFunction(node: nodes.DivFunction): void {
    this.visit(node.operand1);
    this.visit(node.operand2);
  }

  public visitIntFunction(node: nodes.IntFunction): void {
    this.visit(node.valueToConvert);
  }

  public visitModFunction(node: nodes.ModFunction): void {
    this.visit(node.operand1);
    this.visit(node.operand2);
  }

  public visitMulFunction(node: nodes.MulFunction): void {
    this.visit(node.operand1);
    this.visit(node.operand2);
  }

  public visitSubFunction(node: nodes.SubFunction): void {
    this.visit(node.operand1);
    this.visit(node.operand2);
  }

  public visitBase64Function(node: nodes.Base64Function): void {
    this.visit(node.inputStr);
  }

  public visitPadLeftFunction(node: nodes.PadLeftFunction): void {
    this.visit(node.valueToPad);
    this.visit(node.totalLength);
    this.visit(node.paddingCharacter);
  }

  public visitReplaceFunction(node: nodes.ReplaceFunction): void {
    this.visit(node.originalString);
    this.visit(node.oldString);
    this.visit(node.newString);
  }

  public visitSplitFunction(node: nodes.SplitFunction): void {
    this.visit(node.inputString);
    this.visit(node.delimiter);
  }

  public visitStringFunction(node: nodes.StringFunction): void {
    this.visit(node.valueToConvert);
  }

  public visitSubstringFunction(node: nodes.SubstringFunction): void {
    this.visit(node.stringToParse);
    this.visit(node.startIndex);
    this.visit(node.length);
  }

  public visitToLowerFunction(node: nodes.ToLowerFunction): void {
    this.visit(node.stringToChange);
  }

  public visitToUpperFunction(node: nodes.ToUpperFunction): void {
    this.visit(node.stringToChange);
  }

  public visitTrimFunction(node: nodes.TrimFunction): void {
    this.visit(node.stringToTrim);
  }

  public visitUniqueStringFunction(node: nodes.UniqueStringFunction): void {
    this.visit(node.baseString);
    for (let str of node.extraStrings) {
      this.visit(str);
    }
  }

  public visitUriFunction(node: nodes.UriFunction): void {
    this.visit(node.baseUri);
    this.visit(node.relativeUri);
  }

  public visitConcatFunction(node: nodes.ConcatFunction): void {
    for (let element of node.elementsToConcat) {
      this.visit(element);
    }
  }

  public visitLengthFunction(node: nodes.LengthFunction): void {
    this.visit(node.element);
  }

  public visitSkipFunction(node: nodes.SkipFunction): void {
    this.visit(node.originalValue);
    this.visit(node.numberToSkip);
  }

  public visitTakeFunction(node: nodes.TakeFunction): void {
    this.visit(node.originalValue);
    this.visit(node.numberToTake);
  }

  public visitDeploymentFunction(node: nodes.DeploymentFunction): void {
    for (let prop of node.properties) {
      this.visit(prop);
    }
  }

  public visitParametersFunction(node: nodes.ParametersFunction): void {
    this.visit(node.parameterName);
    for (let prop of node.properties) {
      this.visit(prop);
    }
  }

  public visitVariablesFunction(node: nodes.VariablesFunction): void {
    this.visit(node.variableName);
    for (let prop of node.properties) {
      this.visit(prop);
    }
  }

  public visitListKeysFunction(node: nodes.ListKeysFunction): void {
    this.visit(node.resourceNameOrId);
    this.visit(node.apiVersion);
    for (let prop of node.properties) {
      this.visit(prop);
    }
  }

  public visitListValueFunction(node: nodes.ListValueFunction): void {
    this.visit(node.resourceNameOrId);
    this.visit(node.apiVersion);
    for (let prop of node.properties) {
      this.visit(prop);
    }
  }

  public visitProvidersFunction(node: nodes.ProvidersFunction): void {
    this.visit(node.providerNamespace);
    this.visit(node.resourceType);
    for (let prop of node.properties) {
      this.visit(prop);
    }
  }

  public visitReferenceFunction(node: nodes.ReferenceFunction): void {
    this.visit(node.resourceNameOrId);
    this.visit(node.apiVersion);
    for (let prop of node.properties) {
      this.visit(prop);
    }
  }

  public visitResourceGroupFunction(node: nodes.ResourceGroupFunction): void {
    for (let prop of node.properties) {
      this.visit(prop);
    }
  }

  public visitResourceIdFunction(node: nodes.ResourceIdFunction): void {
    this.visit(node.first);
    this.visit(node.second);
    for (let item of node.rest) {
      this.visit(item);
    }
  }

  public visitSubscriptionFunction(node: nodes.SubscriptionFunction): void {
    for (let prop of node.properties) {
      this.visit(prop);
    }
  }
}
