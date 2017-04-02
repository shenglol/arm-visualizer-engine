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
    // Identifiers
    Identifier: 0,

    // Literals
    IntegerLiteral: 1,
    StringLiteral: 2,
    ObjectLiteral: 3,
    ArrayLiteral: 4,

    // Integer Functions
    AddFunction: 5,
    CopyIndexFunction: 6,
    DivFunction: 7,
    IntFunction: 8,
    ModFunction: 9,
    MulFunction: 10,
    SubFunction: 11,

    // String Functions
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

    // Array Functions (String Functions cont.)
    ConcatFunction: 23,
    LengthFunction: 24,
    SkipFunction: 25,
    TakeFunction: 26,

    // Deployment Value Functions
    DeploymentFunction: 27,
    ParametersFunction: 28,
    VariablesFunction: 29,

    // Resource Functions
    ListKeysFunction: 30,
    ListValueFunction: 31,
    ProvidersFunction: 32,
    ReferenceFunction: 33,
    ResourceGroupFunction: 34,
    ResourceIdFunction: 35,
    SubscriptionFunction: 36
  };

  let functionNames = [
    "add",
    "copyIndex",
    "div",
    "int",
    "mod",
    "mul",
    "sub",
    "base64",
    "concat",
    "length",
    "padLeft",
    "replace",
    "skip",
    "split",
    "string",
    "substring",
    "take",
    "toLower",
    "toUpper",
    "trim",
    "uniqueString",
    "uri",
    "concat",
    "length",
    "skip",
    "take",
    "deployment",
    "parameters",
    "variables",
    "listKeys",
    "listValue",
    "providers",
    "reference",
    "resourceGroup",
    "resourceId",
    "subscription"
  ];

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
  // The following string literals are not expression, but we may still parse it.
  = "[[" .* { return literalNode(nodeKind.StringLiteral, location(), text()); }
  / !"[" .* { return literalNode(nodeKind.StringLiteral, location(), text()); }

  // An expression contains a function as its root.
  / "[" _ func:function _ "]" { return func; }

  // Errors.
  / "[" _ func:function _ ch:[^\]]+ "]" { error("Expected end of input but \"" + ch.join("") + "\" found."); }
  / "[" _ func:function _ ch:[^\]]+ { error("Expected \"]\" but \"" + ch.join("") + "\" found."); }
  / "[" _ "]" { error("Expected a function in the expression."); }
  / "[" _ ch:[^\]]* { error("Expected \"]\" but end of input found."); }


/* -------- 2. Functions -------- */

function
  // Numeric Functions.
  = addFunction
  / copyIndexFunction
  / divFunction
  / intFunction
  / modFunction
  / mulFunction
  / subFunction

  // String Functions.
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

  // Array Functions (String Functions cont.).
  / concatFunction
  / lengthFunction
  / skipFunction
  / takeFunction

  // Deployment Value Functions.
  / deploymentFunction
  / parametersFunction
  / variablesFunction

  // Resource Functions.
  / listKeysFunction
  / listValueFunction
  / providersFunction
  / referenceFunction
  / resourceGroupFunction
  / resourceIdFunction
  / subscriptionFunction

  // Unrecognized Function Error.
  / ch:[^ (),\]']+ [ (),\]'] & { return functionNames.indexOf(ch.join("")) < 0; } {
    error("Unrecognized function name: \"" + ch.join("") + "\".");
   }

/* -------- 2.1 Numeric Functions -------- */

addFunction
  = "add" leftParenthese operand1:parameter comma operand2:parameter rightParenthese {
    let node = functionNode(nodeKind.AddFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

copyIndexFunction
  = "copyIndex" leftParenthese offset:optionalParameter rightParenthese {
    let node = functionNode(nodeKind.CopyIndexFunction, location());
    if (offset) {
      node.offset = offset;
    }
    return node;
  }

divFunction
  = "div" leftParenthese operand1:parameter comma operand2:parameter rightParenthese {
    let node = functionNode(nodeKind.DivFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

intFunction
  = "int" leftParenthese valueToConvert:parameter rightParenthese {
    let node = functionNode(nodeKind.IntFunction, location());
    node.valueToConvert = valueToConvert;
    return node;
  }

modFunction
  = "mod" leftParenthese operand1:parameter comma operand2:parameter rightParenthese {
    let node = functionNode(nodeKind.ModFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

mulFunction
  = "mul" leftParenthese operand1:parameter comma operand2:parameter rightParenthese {
    let node = functionNode(nodeKind.MulFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

subFunction
  = "sub" leftParenthese operand1:parameter comma operand2:parameter rightParenthese {
    let node = functionNode(nodeKind.SubFunction, location());
    node.operand1 = operand1;
    node.operand2 = operand2;
    return node;
  }

/* -------- 2.2 String Functions ------- */

base64Function
  = "base64" leftParenthese inputString:parameter rightParenthese {
    let node = functionNode(nodeKind.Base64Function, location());
    node.inputString = inputString;
    return node;
  }

padLeftFunction
  = "padLeft" leftParenthese valueToPad:parameter comma totalLength:parameter
  paddingCharacter:(restComma ch:parameter { return ch; })? rightParenthese {
    let node = functionNode(nodeKind.PadLeftFunction, location());
    node.valueToPad = valueToPad;
    node.totalLength = totalLength;
    if (paddingCharacter) {
      node.paddingCharacter = paddingCharacter;
    }
    return node;
  }

replaceFunction
  = "replace" leftParenthese originalString:parameter comma
  oldString:parameter comma newString:parameter rightParenthese {
    let node = functionNode(nodeKind.ReplaceFunction, location());
    node.originalString = originalString;
    node.oldString = oldString;
    node.newString = newString;
    return node;
  }

splitFunction
  = "split" leftParenthese inputString:parameter comma delimiter:parameter rightParenthese {
    let node = functionNode(nodeKind.SplitFunction, location());
    node.inputString = inputString;
    node.delimiter = delimiter;
    return node;
  }

stringFunction
  = "string" leftParenthese valueToConvert:parameter rightParenthese {
    let node = functionNode(nodeKind.StringFunction, location());
    node.valueToConvert = valueToConvert;
    return node;
  }

substringFunction
  = "substring" leftParenthese stringToParse:parameter
  startIndex:(restComma idx:parameter { return idx; })?
  length:(restComma n:parameter { return n; })? rightParenthese {
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
  = "toLower" leftParenthese stringToChange:parameter rightParenthese {
    let node = functionNode(nodeKind.ToLowerFunction, location());
    node.stringToChange = stringToChange;
    return node;
  }

toUpperFunction
  = "toUpper" leftParenthese stringToChange:parameter rightParenthese {
    let node = functionNode(nodeKind.ToUpperFunction, location());
    node.stringToChange = stringToChange;
    return node;
  }

trimFunction
  = "trim" leftParenthese stringToTrim:parameter rightParenthese {
    let node = functionNode(nodeKind.TrimFunction, location());
    node.stringToTrim = stringToTrim;
    return node;
  }

uniqueStringFunction
  = "uniqueString" leftParenthese baseString:parameter
  extraStrings:(restComma str:parameter { return str; })* rightParenthese {
    let node = functionNode(nodeKind.UniqueStringFunction, location());
    node.baseString = baseString;
    node.extraStrings = extraStrings;
    return node;
  }

uriFunction
  = "uri" leftParenthese baseUri:parameter comma relativeUri:parameter rightParenthese {
    let node = functionNode(nodeKind.UriFunction, location());
    node.baseUri = baseUri;
    node.relativeUri = relativeUri;
    return node;
  }

/* -------- 2.3 Array Functions (String Functions cont.) -------- */

concatFunction
  = "concat" leftParenthese first:parameter
  rest:(restComma element:parameter { return element; })* rightParenthese {
    let node = functionNode(nodeKind.ConcatFunction, location());
    node.elementsToConcat = [first].concat(rest);
    return node;
  }

lengthFunction
  = "length" leftParenthese element:parameter rightParenthese {
    let node = functionNode(nodeKind.LengthFunction, location());
    node.element = element;
    return node;
  }

skipFunction
  = "skip" leftParenthese originalValue:parameter comma numberToSkip:parameter rightParenthese {
    let node = functionNode(nodeKind.SkipFunction, location());
    node.originalValue = originalValue;
    node.numberToSkip = numberToSkip;
    return node;
  }

takeFunction
  = "take" leftParenthese originalValue:parameter comma numberToTake:parameter rightParenthese {
    let node = functionNode(nodeKind.TakeFunction, location());
    node.originalValue = originalValue;
    node.numberToTake = numberToTake;
    return node;
  }

/* -------- 2.4 Deployment Value Functions -------- */

deploymentFunction
  = "deployment" leftParenthese rightParenthese properties:properties {
    let node = functionNode(nodeKind.DeploymentFunction, location());
    node.properties = properties;
    return node;
  }

parametersFunction
  = "parameters" leftParenthese parameterName:parameter rightParenthese properties:properties {
    let node = functionNode(nodeKind.ParametersFunction, location());
    node.parameterName = parameterName;
    node.properties = properties;
    return node;
  }

variablesFunction
  = "variables" leftParenthese variableName:parameter rightParenthese properties:properties {
    let node = functionNode(nodeKind.VariablesFunction, location());
    node.variableName = variableName;
    node.properties = properties;
    return node;
  }

/* -------- 2.5 Resource Functions -------- */

listKeysFunction
  = "listKeys" leftParenthese resourceNameOrId:parameter comma apiVersion:parameter rightParenthese
  properties:properties {
    let node = functionNode(nodeKind.ListKeysFunction, location());
    node.resourceNameOrId = resourceNameOrId;
    node.apiVersion = apiVersion;
    node.properties = properties;
    return node;
  }

listValueFunction
  = "list{Value}" leftParenthese resourceNameOrId:parameter comma apiVersion:parameter rightParenthese
  properties:properties {
    let node = functionNode(nodeKind.ListValueFunction, location());
    node.resourceNameOrId = resourceNameOrId;
    node.apiVersion = apiVersion;
    node.properties = properties;
    return node;
  }

providersFunction
  = "providers" "("
  providerNamespace:parameter
  resourceType:(restComma str:parameter { return str; })? rightParenthese properties:properties {
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
  resourceNameOrId:parameter
  apiVersion:(restComma str:parameter { return str; })? rightParenthese properties:properties {
    let node = functionNode(nodeKind.ReferenceFunction, location());
    node.resourceNameOrId = resourceNameOrId;
    if (apiVersion) {
      node.apiVersion = apiVersion;
    }
    node.properties = properties;
    return node;
  }

resourceGroupFunction
  = "resourceGroup" leftParenthese rightParenthese properties:properties {
    let node = functionNode(nodeKind.ResourceGroupFunction, location());
    node.properties = properties;
    return node;
  }

// FIXME: add rules to match subscriptionId (GUID) and resourceGroupName (xxx/yyy/zzz).
resourceIdFunction
  = "resourceId" leftParenthese first:parameter comma second:parameter
  rest:(restComma str:parameter { return str; })* rightParenthese {
    let node = functionNode(nodeKind.ResourceIdFunction, location());
    node.first = first;
    node.second = second;
    node.rest = rest;
    return node;
  }

subscriptionFunction
  = "subscription" leftParenthese rightParenthese properties:properties {
    let node = functionNode(nodeKind.SubscriptionFunction, location());
    node.properties = properties;
    return node;
  }

/* -------- 3. Parameters -------- */

parameter
  = _ num:integerLiteral { return num; }
  / _ str:stringLiteral { return str; }
  / _ func:function { return func; }
  / _ ch:. { error("Expected a parameter but \"" + ch + "\" found.") }

/*
Used in copyIndex function which has only one optional parameter.
The "parameter" expression above won't work because the last rule will comsume
the optional parameter and throw an error.
*/
optionalParameter
  = _ param:(integerLiteral/stringLiteral/function)? { return param; }

comma
  = _ ","
  / _ !"," ch:. { error("Expected \",\" but found \"" + ch + "\"."); }

/*
Used for rest parameters. Unlike the "comma" expression, it won't throw an error
when a right parenthese encountered, since the right parenthese might be a
termination sign of a rest parameter list.
*/
restComma
  = _ ","
  / _ !"," ch:[^)] { error("Expected \",\" but found \"" + ch + "\"."); }

leftParenthese
  = _ "("
  / _ !"(" ch:[^a-zA-Z] { error("Expected \"(\" but found \"" + ch + "\"."); }

rightParenthese
  = _ ")"
  / _ !")" ch:. { error("Expected \")\" but found \"" + ch + "\"."); }

/* -------- 4. Properties -------- */

properties
  = (dotProperty/indexProperty)*

dotProperty
  = "." prop:identifier { return prop; }

indexProperty
  = leftSqureBracket prop:parameter rightSqureBracket { return prop; }

leftSqureBracket
  = _ "["
  / _ !"[" ch:[^),\]] { error("Expected \"[\" or end of input but found \"" + ch + "\"."); }

rightSqureBracket
  = _ "]"
  / _ !"]" ch:. { error("Expected \"]\" but found \"" + ch + "\"."); }

/* -------- 5. Identifiers -------- */

identifier
  = [a-z]i [0-9a-z_$]i* {
    return {
      kind: nodeKind.Identifier,
      start: location().start.column,
      end: location().end.column,
      text: text()
    };
  }
  / ch:. { error("Expected an identifier but found \"" + ch + "\"."); }

/* -------- 6. Literals -------- */

integerLiteral
  = ("+" / "-")? ([1-9] digit+ / digit) {
    return literalNode(nodeKind.IntegerLiteral, location(), parseInt(text()));
  }

stringLiteral
  = "'" chars:character* "'" {
    return literalNode(nodeKind.StringLiteral, location(), chars.join(""));
  }
  / "'" character* ch:[^'] {
  	error("Expected \"'\" but found \"" + ch + "\".");
  }

/* -------- 7. Basic Lexical Elements -------- */

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


