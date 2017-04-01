import * as _ from "lodash";

export const enum NodeKind {
  // Identifiers
  Identifier,

  // Literals
  IntegerLiteral,
  StringLiteral,
  ObjectLiteral,
  ArrayLiteral,

  // Integer Functions
  AddFunction,
  CopyIndexFunction,
  DivFunction,
  IntFunction,
  ModFunction,
  MulFunction,
  SubFunction,

  /* String Functions */
  Base64Function,
  PadLeftFunction,
  ReplaceFunction,
  SplitFunction,
  StringFunction,
  SubstringFunction,
  ToLowerFunction,
  ToUpperFunction,
  TrimFunction,
  UniqueStringFunction,
  UriFunction,

  /* Array Functions (String Functions cont.) */
  ConcatFunction,
  LengthFunction,
  SkipFunction,
  TakeFunction,

  /* Deployment Value Functions */
  DeploymentFunction,
  ParametersFunction,
  VariablesFunction,

  /* Resource Functions */
  ListKeysFunction,
  ListValueFunction,
  ProvidersFunction,
  ReferenceFunction,
  ResourceGroupFunction,
  ResourceIdFunction,
  SubscriptionFunction
};

export interface Node {
  kind: NodeKind;
  start?: number;
  end?: number;
}

export interface Identifier extends Node {
  kind: NodeKind.Identifier;
  text: string;
}

export interface Literal<TKind extends NodeKind, TValue> extends Node {
  value: TValue;
}

export type IntegerLiteral = Literal<NodeKind.IntegerLiteral, number>;
export type StringLiteral = Literal<NodeKind.StringLiteral, string>;
export type ObjectLiteral = Literal<NodeKind.ObjectLiteral, object>;
export type ArrayLiteral = Literal<NodeKind.ArrayLiteral, any[]>;

export interface Function<TKind extends NodeKind> extends Node {
  kind: TKind;
}

export type Parameter
  = Identifier
  | IntegerLiteral
  | StringLiteral
  | AddFunction
  | CopyIndexFunction
  | DivFunction
  | IntFunction
  | ModFunction
  | MulFunction
  | SubFunction
  | Base64Function
  | PadLeftFunction
  | SplitFunction
  | StringFunction
  | SubstringFunction
  | TakeFunction
  | ToLowerFunction
  | ToUpperFunction
  | TrimFunction
  | UniqueStringFunction
  | UriFunction
  | ConcatFunction
  | LengthFunction
  | SkipFunction
  | TakeFunction
  | ParametersFunction
  | VariablesFunction
  | DeploymentFunction
  | ParametersFunction
  | VariablesFunction
  | ListKeysFunction
  | ListValueFunction
  | ProvidersFunction
  | ReferenceFunction
  | ResourceGroupFunction
  | SubscriptionFunction;

export type Properties = Parameter[];

export interface AddFunction extends Function<NodeKind.AddFunction> {
  operand1: Parameter;
  operand2: Parameter;
}

export interface CopyIndexFunction extends Function<NodeKind.CopyIndexFunction> {
  offset?: Parameter;
}

export interface DivFunction extends Function<NodeKind.DivFunction> {
  operand1: Parameter;
  operand2: Parameter;
}

export interface IntFunction extends Function<NodeKind.IntFunction> {
  valueToConvert: Parameter;
}

export interface ModFunction extends Function<NodeKind.ModFunction> {
  operand1: Parameter;
  operand2: Parameter;
}

export interface MulFunction extends Function<NodeKind.MulFunction> {
  operand1: Parameter;
  operand2: Parameter;
}

export interface SubFunction extends Function<NodeKind.SubFunction> {
  operand1: Parameter;
  operand2: Parameter;
}

export interface Base64Function extends Function<NodeKind.Base64Function> {
  inputStr: Parameter;
}

export interface PadLeftFunction extends Function<NodeKind.PadLeftFunction> {
  valueToPad: Parameter;
  totalLength: Parameter;
  paddingCharacter?: Parameter;
}

export interface ReplaceFunction extends Function<NodeKind.ReplaceFunction> {
  originalString: Parameter;
  oldString: Parameter;
  newString: Parameter;
}

export interface SplitFunction extends Function<NodeKind.SplitFunction> {
  inputString: Parameter;
  delimiter: Parameter;
}

export interface StringFunction extends Function<NodeKind.StringFunction> {
  valueToConvert: Parameter;
}

export interface SubstringFunction extends Function<NodeKind.SubstringFunction> {
  stringToParse: Parameter;
  startIndex?: Parameter;
  length?: Parameter;
}

export interface ToLowerFunction extends Function<NodeKind.ToLowerFunction> {
  stringToChange: Parameter;
}

export interface ToUpperFunction extends Function<NodeKind.ToUpperFunction> {
  stringToChange: Parameter;
}

export interface TrimFunction extends Function<NodeKind.TrimFunction> {
  stringToTrim: Parameter;
}

export interface UniqueStringFunction extends Function<NodeKind.UniqueStringFunction> {
  baseString: Parameter;
  extraStrings: Parameter[];
}

export interface UriFunction extends Function<NodeKind.UriFunction> {
  baseUri: Parameter;
  relativeUri: Parameter;
}

export interface ConcatFunction extends Function<NodeKind.ConcatFunction> {
  elementsToConcat: Parameter[];
  category: "string" | "array";
}

export interface LengthFunction extends Function<NodeKind.LengthFunction> {
  element: Parameter;
  category: "string" | "array";
}

export interface SkipFunction extends Function<NodeKind.SkipFunction> {
  originalValue: Parameter;
  numberToSkip: Parameter;
  category: "string" | "array";
}

export interface TakeFunction extends Function<NodeKind.TakeFunction> {
  originalValue: Parameter;
  numberToTake: Parameter;
  category: "string" | "array";
}

export interface FunctionWithProperties {
  properties: Properties;
}

export interface DeploymentFunction extends Function<NodeKind.DeploymentFunction> {
  properties: Properties;
}

export interface ParametersFunction extends Function<NodeKind.ParametersFunction> {
  parameterName: Parameter;
  properties: Properties;
}

export interface VariablesFunction extends Function<NodeKind.VariablesFunction> {
  variableName: Parameter;
  properties: Properties;
}

export interface ListKeysFunction extends Function<NodeKind.ListKeysFunction> {
  resourceNameOrId: Parameter;
  apiVersion: Parameter;
  properties: Properties;
}

export interface ListValueFunction extends Function<NodeKind.ListValueFunction> {
  resourceNameOrId: Parameter;
  apiVersion: Parameter;
  properties: Properties;
}

export interface ProvidersFunction extends Function<NodeKind.ProvidersFunction> {
  providerNamespace: Parameter;
  resourceType?: Parameter;
  properties: Properties;
}

export interface ReferenceFunction extends Function<NodeKind.ReferenceFunction> {
  resourceNameOrId: Parameter;
  apiVersion?: Parameter;
  properties: Properties;
}

export interface ResourceGroupFunction extends Function<NodeKind.ResourceGroupFunction> {
  properties: Properties;
}

export interface ResourceIdFunction extends Function<NodeKind.ResourceIdFunction> {
  first: Parameter;
  second: Parameter;
  rest: Parameter[];
}

export interface SubscriptionFunction extends Function<NodeKind.SubscriptionFunction> {
  properties: Properties;
}
