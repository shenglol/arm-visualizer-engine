/*
 * Grammar for Azure Resource Manager Template Expressions and Functions
 * =====================================================================
 *
 * Based on the documents from the Azure documentation websites [1] and [2].
 *
 * [1] https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-authoring-templates
 * [2] https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-template-functions
 *
 */

/* -------- 0. Initializer -------- */

{
  const nodeKind = {
    /* Identifiers */
    Identifier: 0,

    /* Literals */
    IntegerLiteral: 1,
    StringLiteral: 2,
    ObjectLiteral: 3,
    ArrayLiteral: 4,

    /* Integer Functions */
    AddFunction: 5,
    CopyIndexFunction: 6,
    DivFunction: 7,
    IntFunction: 8,
    ModFunction: 9,
    MulFunction: 10,
    SubFunction: 11,

    /* String Functions */
    Base64Function: 12,
    PadLeftFunction: 13,
    ReplaceFunction: 14,
    SplitFunction: 15,
    StringFunction: 16,
    SubstringFunction: 17,
    ToLowerFunction: 18,
    ToUpperFunction: 19,
    TrimFunction: 20,
    UniqueStringFunction: 21,
    UriFunction: 22,

    /* Array Functions (String Functions cont.) */
    ConcatFunction: 23,
    LengthFunction: 24,
    SkipFunction: 25,
    TakeFunction: 26,

    /* Deployment Value Functions */
    DeploymentFunction: 27,
    ParametersFunction: 28,
    VariablesFunction: 29,

    /* Resource Functions */
    ListKeysFunction: 30,
    ListValueFunction: 31,
    ProvidersFunction: 32,
    ReferenceFunction: 33,
    ResourceGroupFunction: 34,
    ResourceIdFunction: 35,
    SubscriptionFunction: 36
  };

  let literalNode = function(kind, location, value) {
    return {
      kind: kind,
      start: location.start.column,
      end: location.end.column,
      value: value
    };
  }

  let functionNode = function(kind, location) {
    return {
      kind: kind,
      start: location.start.column,
      end: location.end.column,
    };
  }
}

/* -------- 1. Expression -------- */

start
  = expression

expression
  = "[" _ func:function _ "]" { return func; }

/* -------- 2. Functions -------- */

function
  /* Numeric Functions */
  = addFunction
  / copyIndexFunction
  / divFunction
  / intFunction
  / modFunction
  / mulFunction
  / subFunction

  /* String Functions */
  / base64Function
  / concatFunction
  / lengthFunction
  / padLeftFunction
  / replaceFunction
  / skipFunction
  / splitFunction
  / stringFunction
  / substringFunction
  / takeFunction
  / toLowerFunction
  / toUpperFunction
  / trimFunction
  / uniqueStringFunction
  / uriFunction

  /* Array Functions */
  / concatFunction
  / lengthFunction
  / skipFunction
  / takeFunction

  /* Deployment Value Functions */
  / deploymentFunction
  / parametersFunction
  / variablesFunction

  /* Resource Functions */
  / listKeysFunction
  / listValueFunction
  / providersFunction
  / referenceFunction
  / resourceGroupFunction
  / resourceIdFunction
  / subscriptionFunction

/* -------- 2.1 Numeric Functions -------- */

addFunction
  = "add" "(" operand1:intParam "," operand2:intParam ")" {
    let node = functionNode(nodeKind.AddFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

copyIndexFunction
  = "copyIndex" "(" offset:intParam? ")" {
    let node = functionNode(nodeKind.CopyIndexFunction, location());
    if (offset) {
      node.offset = offset;
    }
    return node;
  }

divFunction
  = "div" "(" operand1:intParam "," operand2:intParam ")" {
    let node = functionNode(nodeKind.DivFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

intFunction
  = "int" "(" valueToConvert:(intParam/strParam) ")" {
    let node = functionNode(nodeKind.IntFunction, location());
    node.valueToConvert = valueToConvert;
    return node;
  }

modFunction
  = "mod" "(" operand1:intParam "," operand2:intParam ")" {
    let node = functionNode(nodeKind.ModFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

mulFunction
  = "mul" "(" operand1:intParam "," operand2:intParam ")" {
    let node = functionNode(nodeKind.MulFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

subFunction
  = "sub" "(" operand1:intParam "," operand2:intParam ")" {
    let node = functionNode(nodeKind.SubFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

/* -------- 2.2 String Functions ------- */

base64Function
  = "base64" "(" inputString:strParam ")" {
    let node = functionNode(nodeKind.Base64Function, location());
    node.inputString = inputString;
    return node;
  }

padLeftFunction
  = "padLeft" "(" valueToPad:(strParam/intParam) "," totalLength:intParam
  paddingCharacter:("," ch:charParam { return ch; })? ")" {
    let node = functionNode(nodeKind.PadLeftFunction, location());
    node.valueToPad = valueToPad;
    node.totalLength = totalLength;
    if (paddingCharacter) {
      node.paddingCharacter = paddingCharacter;
    }
    return node;
  }

replaceFunction
  = "replace" "(" originalString:strParam "," oldString:strParam "," newString:strParam ")" {
    let node = functionNode(nodeKind.ReplaceFunction, location());
    node.originalString = originalString;
    node.oldString = oldString;
    node.newString = newString;
    return node;
  }

splitFunction
  = "split" "(" inputString:strParam "," delimiter:strParam ")" {
    let node = functionNode(nodeKind.SplitFunction, location());
    node.inputString = inputString;
    node.delimiter = delimiter;
    return node;
  }

stringFunction
  = "string" "(" valueToConvert:(intParam/strParam/arrayParam/objParam) ")" {
    let node = functionNode(nodeKind.StringFunction, location());
    node.valueToConvert = valueToConvert;
    return node;
  }

substringFunction
  = "substring" "(" stringToParse:strParam
  startIndex:("," idx:intParam { return idx; })? length:("," n:intParam { return n; })? ")" {
    let node = functionNode(nodeKind.SubstringFunction, location());
    node.stringToParse = stringToParse;
    if (startIndex) {
      node.startIndex = startIndex;
    }
    if (length) {
      node.length = length;
    }
    return node;
  }

toLowerFunction
  = "toLower" "(" stringToChange:strParam ")" {
    let node = functionNode(nodeKind.ToLowerFunction, location());
    node.stringToChange = stringToChange;
    return node;
  }

toUpperFunction
  = "toUpper" "(" stringToChange:strParam ")" {
    let node = functionNode(nodeKind.ToUpperFunction, location());
    node.stringToChange = stringToChange;
    return node;
  }

trimFunction
  = "trim" "(" stringToTrim:strParam ")" {
    let node = functionNode(nodeKind.TrimFunction, location());
    node.stringToTrim = stringToTrim;
    return node;
  }

uniqueStringFunction
  = "uniqueString" "(" baseString:strParam extraStrings:("," str:strParam { return str; })* ")" {
    let node = functionNode(nodeKind.UniqueStringFunction, location());
    node.baseString = baseString;
    node.extraStrings = extraStrings;
    return node;
  }

uriFunction
  = "uri" "(" baseUri:strParam "," relativeUri:strParam ")" {
    let node = functionNode(nodeKind.UriFunction, location());
    node.baseUri = baseUri;
    node.relativeUri = relativeUri;
    return node;
  }

/* -------- 2.3 Array Functions (String Functions cont.) -------- */

concatFunction
  = "concat" "(" first:strParam rest:("," element:strParam { return element; })* ")" {
    let node = functionNode(nodeKind.ConcatFunction, location());
    node.elementsToConcat = [first].concat(rest);
    return node;
  }

lengthFunction
  = "length" "(" element:strParam ")" {
    let node = functionNode(nodeKind.LengthFunction, location());
    node.element = element;
    return node;
  }

skipFunction
  = "skip" "(" originalValue:strParam "," numberToSkip:intParam ")" {
    let node = functionNode(nodeKind.SkipFunction, location());
    node.originalValue = originalValue;
    node.numberToSkip = numberToSkip;
    return node;
  }

takeFunction
  = "take" "(" originalValue:strParam "," numberToTake:intParam ")" {
    let node = functionNode(nodeKind.TakeFunction, location());
    node.originalValue = originalValue;
    node.numberToTake = numberToTake;
    return node;
  }

/* -------- 2.4 Deployment Value Functions -------- */

deploymentFunction
  = "deployment" "(" ")" properties:properties {
    let node = functionNode(nodeKind.DeploymentFunction, location());
    node.properties = properties;
    return node;
  }

parametersFunction
  = "parameters" "(" parameterName:strParam ")" properties:properties {
    let node = functionNode(nodeKind.ParametersFunction, location());
    node.parameterName = parameterName;
    node.properties = properties;
    return node;
  }

variablesFunction
  = "variables" "(" variableName:strParam ")" properties:properties {
    let node = functionNode(nodeKind.VariablesFunction, location());
    node.variableName = variableName;
    node.properties = properties;
    return node;
  }

/* -------- 2.5 Resource Functions -------- */

listKeysFunction
  = "listKeys" "(" resourceNameOrId:strParam "," apiVersion:strParam ")" properties:properties {
    let node = functionNode(nodeKind.ListKeysFunction, location());
    node.resourceNameOrId = resourceNameOrId;
    node.apiVersion = apiVersion;
    node.properties = properties;
    return node;
  }

listValueFunction
  = "list{Value}" "(" resourceNameOrId:strParam "," apiVersion:strParam ")" properties:properties {
    let node = functionNode(nodeKind.ListValueFunction, location());
    node.resourceNameOrId = resourceNameOrId;
    node.apiVersion = apiVersion;
    node.properties = properties;
    return node;
  }

providersFunction
  = "providers" "("
  providerNamespace:strParam resourceType:("," str:strParam { return str; })? ")" properties:properties {
    let node = functionNode(nodeKind.ProvidersFunction, location());
    node.providerNamespace = providerNamespace;
    if (resourceType) {
      node.resourceType = resourceType;
    }
    node.properties = properties;
    return node;
  }

referenceFunction
  = "reference" "("
  resourceNameOrId:strParam "," apiVersion:("," str:strParam { return str; })? ")" properties:properties {
    let node = functionNode(nodeKind.ReferenceFunction, location());
    node.resourceNameOrId = resourceNameOrId;
    if (apiVersion) {
      node.apiVersion = apiVersion;
    }
    node.properties = properties;
    return node;
  }

resourceGroupFunction
  = "resourceGroup" "(" ")" properties:properties {
    let node = functionNode(nodeKind.ResourceGroupFunction, location());
    node.properties = properties;
    return node;
  }

// FIXME: add rules to match subscriptionId (GUID) and resourceGroupName (xxx/yyy/zzz).
resourceIdFunction
  = "resourceId" "(" first:strParam "," second:strParam rest:("," str:strParam { return str; })* ")" {
    let node = functionNode(nodeKind.ResourceIdFunction, location());
    node.first = first;
    node.second = second;
    node.rest = rest;
    return node;
  }

subscriptionFunction
  = "subscription" "(" ")" properties:properties {
    let node = functionNode(nodeKind.SubscriptionFunction, location());
    node.properties = properties;
    return node;
  }

/* -------- 3. Parameters -------- */

intParam
  = _ num:integerLiteral _ { return num; }
  / _ func:(
    addFunction
    / copyIndexFunction
    / divFunction
    / intFunction
    / modFunction
    / mulFunction
    / subFunction
    / lengthFunction
    / parametersFunction
    / variablesFunction
  ) _ { return func; }

strParam
  = _ str:stringLiteral _ { return str; }
  / _ func:(
    base64Function
    / concatFunction
    / lengthFunction
    / padLeftFunction
    / replaceFunction
    / skipFunction
    / splitFunction
    / stringFunction
    / substringFunction
    / takeFunction
    / toLowerFunction
    / toUpperFunction
    / trimFunction
    / uniqueStringFunction
    / uriFunction
    / concatFunction
    / lengthFunction
    / skipFunction
    / takeFunction
    / parametersFunction
    / variablesFunction
  ) _ { return func; }

charParam
  = _ "'" ch:character "'" _ {
    return literalNode(nodeKind.StringLiteral, location(), ch);
  }

arrayParam
  = _ func:(
     concatFunction
    / lengthFunction
    / skipFunction
    / takeFunction
    / parametersFunction
    / variablesFunction
    / parametersFunction
    / variablesFunction
  ) { return func; }

objParam
  = _ func:(
    deploymentFunction
    / parametersFunction
    / variablesFunction
    / listKeysFunction
    / listValueFunction
    / providersFunction
    / referenceFunction
    / resourceGroupFunction
    / subscriptionFunction
  ) { return func; }

/* -------- 4. Properties -------- */

properties
  = (dotProperty/indexProperty)*

dotProperty
  = "." prop:identifier { return prop; }

indexProperty
  = "[" prop:(intParam/strParam) "]" { return prop; }

/* -------- 5. Identifiers -------- */

identifier
  = id:[0-9a-z_$]i+ {
    return {
      kind: nodeKind.Identifier,
      start: location().start.column,
      end: location().end.column,
      text: id.join("")
    };
  }


/* -------- 6. Literals -------- */

integerLiteral
  = ("+" / "-")? ([1-9] digit+ / digit) {
    return literalNode(nodeKind.IntegerLiteral, location(), parseInt(text()));
  }

stringLiteral
  = "'" chars:character* "'" {
    return literalNode(nodeKind.StringLiteral, location(), chars.join(""));
  }

/* -------- 7. Other Lexical Elements -------- */

character
  = [^'\\\0-\x1F\x7f]
  / "\\'"  { return "'";  }
  / "\\\\" { return "\\"; }
  / "\\/"  { return "/";  }
  / "\\b"  { return "\b"; }
  / "\\f"  { return "\f"; }
  / "\\n"  { return "\n"; }
  / "\\r"  { return "\r"; }
  / "\\t"  { return "\t"; }
  / "\\u" digits:$(hexDigit hexDigit hexDigit hexDigit) {
    return String.fromCharCode(parseInt(digits, 16));
  }

digit
  = [0-9]

hexDigit
  = [0-9a-f]i

_ "whitespaces"
  = ws*

ws "whitespace"
  = [ \t\r\n]
