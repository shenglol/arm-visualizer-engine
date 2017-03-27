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

export type IntegerParameter
  = IntegerLiteral
  | AddFunction
  | CopyIndexFunction
  | DivFunction
  | IntFunction
  | ModFunction
  | MulFunction
  | SubFunction
  | LengthFunction
  | ParametersFunction
  | VariablesFunction;

export type StringParameter
  = StringLiteral
  | Base64Function
  | ConcatFunction
  | LengthFunction
  | PadLeftFunction
  | ReplaceFunction
  | SkipFunction
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
  | VariablesFunction;

export type ArrayParameter
  = ConcatFunction
  | LengthFunction
  | SkipFunction
  | TakeFunction
  | ParametersFunction
  | VariablesFunction
  | ParametersFunction
  | VariablesFunction;

export type ObjectParameter
  = DeploymentFunction
  | ParametersFunction
  | VariablesFunction
  | ListKeysFunction
  | ListValueFunction
  | ProvidersFunction
  | ReferenceFunction
  | ResourceGroupFunction
  | SubscriptionFunction;

export type Properties = (IntegerParameter | StringParameter | Identifier)[];

export interface AddFunction extends Function<NodeKind.AddFunction> {
  operand1: IntegerParameter;
  operand2: IntegerParameter;
}

export interface CopyIndexFunction extends Function<NodeKind.CopyIndexFunction> {
  offset?: IntegerParameter;
}

export interface DivFunction extends Function<NodeKind.DivFunction> {
  operand1: IntegerParameter;
  operand2: IntegerParameter;
}

export interface IntFunction extends Function<NodeKind.IntFunction> {
  valueToConvert: IntegerParameter | StringParameter;
}

export interface ModFunction extends Function<NodeKind.ModFunction> {
  operand1: IntegerParameter;
  operand2: IntegerParameter;
}

export interface MulFunction extends Function<NodeKind.MulFunction> {
  operand1: IntegerParameter;
  operand2: IntegerParameter;
}

export interface SubFunction extends Function<NodeKind.SubFunction> {
  operand1: IntegerParameter;
  operand2: IntegerParameter;
}

export interface Base64Function extends Function<NodeKind.Base64Function> {
  inputStr: StringParameter;
}

export interface PadLeftFunction extends Function<NodeKind.PadLeftFunction> {
  valueToPad: StringParameter | IntegerParameter;
  totalLength: IntegerParameter;
  paddingCharacter?: string;
}

export interface ReplaceFunction extends Function<NodeKind.ReplaceFunction> {
  originalString: StringParameter;
  oldString: StringParameter;
  newString: StringParameter;
}

export interface SplitFunction extends Function<NodeKind.SplitFunction> {
  inputString: StringParameter;
  delimiter: StringParameter;
}

export interface StringFunction extends Function<NodeKind.StringFunction> {
  valueToConvert: IntegerParameter | StringParameter | ArrayParameter | ObjectParameter;
}

export interface SubstringFunction extends Function<NodeKind.SubstringFunction> {
  stringToParse: StringParameter;
  startIndex?: IntegerParameter;
  length?: IntegerParameter;
}

export interface ToLowerFunction extends Function<NodeKind.ToLowerFunction> {
  stringToChange: StringParameter;
}

export interface ToUpperFunction extends Function<NodeKind.ToUpperFunction> {
  stringToChange: StringParameter;
}

export interface TrimFunction extends Function<NodeKind.TrimFunction> {
  stringToTrim: StringParameter;
}

export interface UniqueStringFunction extends Function<NodeKind.UniqueStringFunction> {
  baseString: StringParameter;
  extraStrings: StringParameter[];
}

export interface UriFunction extends Function<NodeKind.UriFunction> {
  baseUri: StringParameter;
  relativeUri: StringParameter;
}

export interface ConcatFunction extends Function<NodeKind.ConcatFunction> {
  elementsToConcat: StringParameter[];
}

export interface LengthFunction extends Function<NodeKind.LengthFunction> {
  element: StringParameter;
}

export interface SkipFunction extends Function<NodeKind.SkipFunction> {
  originalValue: StringParameter;
  numberToSkip: IntegerParameter;
}

export interface TakeFunction extends Function<NodeKind.TakeFunction> {
  originalValue: StringParameter;
  numberToTake: IntegerParameter;
}

export interface DeploymentFunction extends Function<NodeKind.DeploymentFunction> {
  properties: Properties;
}

export interface ParametersFunction extends Function<NodeKind.ParametersFunction> {
  parameterName: StringParameter;
  properties: Properties;
}

export interface VariablesFunction extends Function<NodeKind.VariablesFunction> {
  variableName: StringParameter;
  properties: Properties;
}

export interface ListKeysFunction extends Function<NodeKind.ListKeysFunction> {
  resourceNameOrId: StringParameter;
  apiVersion: StringParameter;
  properties: Properties;
}

export interface ListValueFunction extends Function<NodeKind.ListValueFunction> {
  resourceNameOrId: StringParameter;
  apiVersion: StringParameter;
  properties: Properties;
}

export interface ProvidersFunction extends Function<NodeKind.ProvidersFunction> {
  providerNamespace: StringParameter;
  resourceType?: StringParameter;
  properties: Properties;
}

export interface ReferenceFunction extends Function<NodeKind.ReferenceFunction> {
  resourceNameOrId: StringParameter;
  apiVersion?: StringParameter;
  properties: Properties;
}

export interface ResourceGroupFunction extends Function<NodeKind.ResourceGroupFunction> {
  properties: Properties;
}

export interface ResourceIdFunction extends Function<NodeKind.ResourceIdFunction> {
  first: StringParameter;
  second: StringParameter;
  rest: StringParameter[];
}

export interface SubscriptionFunction extends Function<NodeKind.SubscriptionFunction> {
  properties: Properties;
}
