import "mocha";
import { expect } from "chai";

import { parser, NodeKind } from "../../src";

describe("Parser", () => {
  describe("#parse", () => {
    it("should parse add function", () => {
      expect(parser.parse("[add(1, -1)]")).to.deep.equal({
        kind: NodeKind.AddFunction,
        start: 2,
        end: 12,
        operand1: {
          kind: NodeKind.IntegerLiteral,
          start: 6,
          end: 7,
          value: 1
        },
        operand2: {
          kind: NodeKind.IntegerLiteral,
          start: 9,
          end: 11,
          value: -1
        },
      });
    });

    it("should parse copyIndex function", () => {
      expect(parser.parse("[copyIndex()]")).to.deep.equal({
        kind: NodeKind.CopyIndexFunction,
        start: 2,
        end: 13
      });
    });

    it("should parse copyIndex function with offset", () => {
      expect(parser.parse("[copyIndex(10)]")).to.deep.equal({
        kind: NodeKind.CopyIndexFunction,
        start: 2,
        end: 15,
        offset: {
          kind: NodeKind.IntegerLiteral,
          start: 12,
          end: 14,
          value: 10
        }
      });
    });

    it("should parse div function", () => {
      expect(parser.parse("[div(100, 200)]")).to.deep.equal({
        kind: NodeKind.DivFunction,
        start: 2,
        end: 15,
        operand1: {
          kind: NodeKind.IntegerLiteral,
          start: 6,
          end: 9,
          value: 100
        },
        operand2: {
          kind: NodeKind.IntegerLiteral,
          start: 11,
          end: 14,
          value: 200
        },
      });
    });

    it("should parse int function", () => {
      expect(parser.parse("[int('foo')]")).to.deep.equal({
        kind: NodeKind.IntFunction,
        start: 2,
        end: 12,
        valueToConvert: {
          kind: NodeKind.StringLiteral,
          start: 6,
          end: 11,
          value: 'foo'
        },
      });
    });

    it("should parse mod function", () => {
      expect(parser.parse("[mod(100, 200)]")).to.deep.equal({
        kind: NodeKind.ModFunction,
        start: 2,
        end: 15,
        operand1: {
          kind: NodeKind.IntegerLiteral,
          start: 6,
          end: 9,
          value: 100
        },
        operand2: {
          kind: NodeKind.IntegerLiteral,
          start: 11,
          end: 14,
          value: 200
        },
      });
    });

    it("should parse mul function", () => {
      expect(parser.parse("[mul(100, 200)]")).to.deep.equal({
        kind: NodeKind.MulFunction,
        start: 2,
        end: 15,
        operand1: {
          kind: NodeKind.IntegerLiteral,
          start: 6,
          end: 9,
          value: 100
        },
        operand2: {
          kind: NodeKind.IntegerLiteral,
          start: 11,
          end: 14,
          value: 200
        },
      });
    });

    it("should parse sub function", () => {
      expect(parser.parse("[sub(100, 200)]")).to.deep.equal({
        kind: NodeKind.SubFunction,
        start: 2,
        end: 15,
        operand1: {
          kind: NodeKind.IntegerLiteral,
          start: 6,
          end: 9,
          value: 100
        },
        operand2: {
          kind: NodeKind.IntegerLiteral,
          start: 11,
          end: 14,
          value: 200
        },
      });
    });

    it("should parse base64 function", () => {
      expect(parser.parse("[base64('qux')]")).to.deep.equal({
        kind: NodeKind.Base64Function,
        start: 2,
        end: 15,
        inputString: {
          kind: NodeKind.StringLiteral,
          start: 9,
          end: 14,
          value: "qux"
        }
      });
    });

    it("should parse padLeft function", () => {
      expect(parser.parse("[padLeft('foo', 10)]")).to.deep.equal({
        kind: NodeKind.PadLeftFunction,
        start: 2,
        end: 20,
        valueToPad: {
          kind: 2,
          start: 10,
          end: 15,
          value: "foo"
        },
        totalLength: {
          kind: NodeKind.IntegerLiteral,
          start: 17,
          end: 19,
          value: 10
        }
      });
    });

    it("should parse padLeft function with paddingCharacter", () => {
      expect(parser.parse("[padLeft('foo', 10, 'x')]")).to.deep.equal({
        kind: NodeKind.PadLeftFunction,
        start: 2,
        end: 25,
        valueToPad: {
          kind: 2,
          start: 10,
          end: 15,
          value: "foo"
        },
        totalLength: {
          kind: NodeKind.IntegerLiteral,
          start: 17,
          end: 19,
          value: 10
        },
        paddingCharacter: {
          kind: NodeKind.StringLiteral,
          start: 20,
          end: 24,
          value: "x"
        }
      });
    });

    it("should parse replace function", () => {
      expect(parser.parse("[replace('fox', 'f', 'b')]")).to.deep.equal({
        kind: NodeKind.ReplaceFunction,
        start: 2,
        end: 26,
        originalString: {
          kind: NodeKind.StringLiteral,
          start: 10,
          end: 15,
          value: "fox"
        },
        oldString: {
          kind: NodeKind.StringLiteral,
          start: 17,
          end: 20,
          value: "f"
        },
        newString: {
          kind: NodeKind.StringLiteral,
          start: 22,
          end: 25,
          value: "b"
        }
      });
    });

    it("should parse split function", () => {
      expect(parser.parse("[split('foobar', ',')]")).to.deep.equal({
        kind: NodeKind.SplitFunction,
        start: 2,
        end: 22,
        inputString: {
          kind: NodeKind.StringLiteral,
          start: 8,
          end: 16,
          value: "foobar"
        },
        delimiter: {
          kind: NodeKind.StringLiteral,
          start: 18,
          end: 21,
          value: ","
        }
      });
    });

    it("should parse string function", () => {
      expect(parser.parse("[string(12345)]")).to.deep.equal({
        kind: NodeKind.StringFunction,
        start: 2,
        end: 15,
        valueToConvert: {
          kind: NodeKind.IntegerLiteral,
          start: 9,
          end: 14,
          value: 12345
        }
      });
    });

    it("should parse substring function", () => {
      expect(parser.parse("[substring('foobar')]")).to.deep.equal({
        kind: NodeKind.SubstringFunction,
        start: 2,
        end: 21,
        stringToParse: {
          kind: NodeKind.StringLiteral,
          start: 12,
          end: 20,
          value: "foobar"
        }
      });
    });

    it("should parse toLower function", () => {
      expect(parser.parse("[toLower('FOOBAR')]")).to.deep.equal({
        kind: NodeKind.ToLowerFunction,
        start: 2,
        end: 19,
        stringToChange: {
          kind: NodeKind.StringLiteral,
          start: 10,
          end: 18,
          value: "FOOBAR"
        }
      });
    });

    it("should parse toUpper function", () => {
      expect(parser.parse("[toUpper('foobar')]")).to.deep.equal({
        kind: NodeKind.ToUpperFunction,
        start: 2,
        end: 19,
        stringToChange: {
          kind: NodeKind.StringLiteral,
          start: 10,
          end: 18,
          value: "foobar"
        }
      });
    });

    it("should parse trim function", () => {
      expect(parser.parse("[trim('foobar')]")).to.deep.equal({
        kind: NodeKind.TrimFunction,
        start: 2,
        end: 16,
        stringToTrim: {
          kind: NodeKind.StringLiteral,
          start: 7,
          end: 15,
          value: "foobar"
        }
      });
    });

    it("should parse uniqueString function", () => {
      expect(parser.parse("[uniqueString('foo')]")).to.deep.equal({
        kind: NodeKind.UniqueStringFunction,
        start: 2,
        end: 21,
        baseString: {
          kind: NodeKind.StringLiteral,
          start: 15,
          end: 20,
          value: "foo"
        },
        extraStrings: []
      });
    });

    it("should parse uniqueString function with extra strings", () => {
      expect(parser.parse("[uniqueString('foo', 'bar', 'qux')]")).to.deep.equal({
        kind: NodeKind.UniqueStringFunction,
        start: 2,
        end: 35,
        baseString: {
          kind: NodeKind.StringLiteral,
          start: 15,
          end: 20,
          value: "foo"
        },
        extraStrings: [
          {
            kind: NodeKind.StringLiteral,
            start: 22,
            end: 27,
            value: "bar"
          },
          {
            kind: NodeKind.StringLiteral,
            start: 29,
            end: 34,
            value: "qux"
          }
        ]
      });
    });

    it("should parse uri function", () => {
      expect(parser.parse("[uri('foo', 'bar')]")).to.deep.equal({
        kind: NodeKind.UriFunction,
        start: 2,
        end: 19,
        baseUri: {
          kind: NodeKind.StringLiteral,
          start: 6,
          end: 11,
          value: "foo"
        },
        relativeUri: {
          kind: NodeKind.StringLiteral,
          start: 13,
          end: 18,
          value: "bar"
        }
      });
    });

    it("should parse concat function", () => {
      expect(parser.parse("[concat('foo', 'bar', 'baz')]")).to.deep.equal({
        kind: NodeKind.ConcatFunction,
        start: 2,
        end: 29,
        elementsToConcat: [
          {
            kind: NodeKind.StringLiteral,
            start: 9,
            end: 14,
            value: "foo"
          },
          {
            kind: NodeKind.StringLiteral,
            start: 16,
            end: 21,
            value: "bar"
          },
          {
            kind: NodeKind.StringLiteral,
            start: 23,
            end: 28,
            value: "baz"
          },
        ]
      });
    });

    it("should parse length function", () => {
      expect(parser.parse("[length('foobar')]")).to.deep.equal({
        kind: NodeKind.LengthFunction,
        start: 2,
        end: 18,
        element: {
          kind: NodeKind.StringLiteral,
          start: 9,
          end: 17,
          value: "foobar"
        }
      });
    });

    it("should parse skip function", () => {
      expect(parser.parse("[skip('foobar', 3)]")).to.deep.equal({
        kind: NodeKind.SkipFunction,
        start: 2,
        end: 19,
        originalValue: {
          kind: NodeKind.StringLiteral,
          start: 7,
          end: 15,
          value: "foobar"
        },
        numberToSkip: {
          kind: NodeKind.IntegerLiteral,
          start: 17,
          end: 18,
          value: 3
        }
      });
    });

    it("should parse take function", () => {
      expect(parser.parse("[take('foobar', 3)]")).to.deep.equal({
        kind: NodeKind.TakeFunction,
        start: 2,
        end: 19,
        originalValue: {
          kind: NodeKind.StringLiteral,
          start: 7,
          end: 15,
          value: "foobar"
        },
        numberToTake: {
          kind: NodeKind.IntegerLiteral,
          start: 17,
          end: 18,
          value: 3
        }
      });
    });

    it("should parse deployment function", () => {
      expect(parser.parse("[deployment()]")).to.deep.equal({
        kind: NodeKind.DeploymentFunction,
        start: 2,
        end: 14,
        properties: []
      });
    });

    it("should parse deployment function with properties", () => {
      expect(parser.parse("[deployment().foo['bar']]")).to.deep.equal({
        kind: NodeKind.DeploymentFunction,
        start: 2,
        end: 25,
        properties: [
          {
            kind: NodeKind.Identifer,
            start: 15,
            end: 18,
            text: "foo"
          },
          {
            kind: NodeKind.StringLiteral,
            start: 19,
            end: 24,
            value: "bar"
          }
        ]
      });
    });

    it("should parse parameters function", () => {
      expect(parser.parse("[parameters('foo')]")).to.deep.equal({
        kind: NodeKind.ParametersFunction,
        start: 2,
        end: 19,
        parameterName: {
          kind: NodeKind.StringLiteral,
          start: 13,
          end: 18,
          value: "foo"
        },
        properties: []
      });
    });

    it("should parse parameters function with properties", () => {
      expect(parser.parse("[parameters('foo')[0].bar]")).to.deep.equal({
        kind: NodeKind.ParametersFunction,
        start: 2,
        end: 26,
        parameterName: {
          kind: NodeKind.StringLiteral,
          start: 13,
          end: 18,
          value: "foo"
        },
        properties: [
          {
            kind: NodeKind.IntegerLiteral,
            start: 20,
            end: 21,
            value: 0
          },
          {
            kind: NodeKind.Identifer,
            start: 23,
            end: 26,
            text: "bar"
          }
        ]
      });
    });

    it("should parse variables function", () => {
      expect(parser.parse("[variables('foo')]")).to.deep.equal({
        kind: NodeKind.VariablesFunction,
        start: 2,
        end: 18,
        variableName: {
          kind: NodeKind.StringLiteral,
          start: 12,
          end: 17,
          value: "foo"
        },
        properties: []
      });
    });

    it("should parse variables function with properties", () => {
      expect(parser.parse("[variables('foo')['name']['length']]")).to.deep.equal({
        kind: NodeKind.VariablesFunction,
        start: 2,
        end: 36,
        variableName: {
          kind: NodeKind.StringLiteral,
          start: 12,
          end: 17,
          value: "foo"
        },
        properties: [
          {
            kind: NodeKind.StringLiteral,
            start: 19,
            end: 25,
            value: "name"
          },
          {
            kind: NodeKind.StringLiteral,
            start: 27,
            end: 35,
            value: "length"
          }
        ]
      });
    });

    it("should parse listKeys function", () => {
      expect(parser.parse("[listKeys('rscId', 'apiVer')]")).to.deep.equal({
        kind: NodeKind.ListKeysFunction,
        start: 2,
        end: 29,
        resourceNameOrId: {
          kind: NodeKind.StringLiteral,
          start: 11,
          end: 18,
          value: "rscId"
        },
        apiVersion: {
          kind: NodeKind.StringLiteral,
          start: 20,
          end: 28,
          value: "apiVer"
        },
        properties: []
      });
    });

    it("should parse listKeys function with properties", () => {
      expect(parser.parse("[listKeys('rscId', 'apiVer').foo[parameters('bar').id]]")).to.deep.equal({
        kind: NodeKind.ListKeysFunction,
        start: 2,
        end: 55,
        resourceNameOrId: {
          kind: NodeKind.StringLiteral,
          start: 11,
          end: 18,
          value: "rscId"
        },
        apiVersion: {
          kind: NodeKind.StringLiteral,
          start: 20,
          end: 28,
          value: "apiVer"
        },
        properties: [
          {
            kind: NodeKind.Identifer,
            start: 30,
            end: 33,
            text: "foo"
          },
          {
            kind: NodeKind.ParametersFunction,
            start: 34,
            end: 54,
            parameterName: {
              kind: NodeKind.StringLiteral,
              start: 45,
              end: 50,
              value: "bar",
            },
            properties: [
              {
                kind: NodeKind.Identifer,
                start: 52,
                end: 54,
                text: "id"
              }
            ]
          }
        ]
      });
    });

    it("should parse listValue function", () => {
      expect(parser.parse("[list{Value}('rscId', 'apiVer')]")).to.deep.equal({
        kind: NodeKind.ListValueFunction,
        start: 2,
        end: 32,
        resourceNameOrId: {
          kind: NodeKind.StringLiteral,
          start: 14,
          end: 21,
          value: "rscId"
        },
        apiVersion: {
          kind: NodeKind.StringLiteral,
          start: 23,
          end: 31,
          value: "apiVer"
        },
        properties: []
      });
    });

    it("should parse listValue function with properties", () => {
      expect(parser.parse("[list{Value}('rscId', 'apiVer')['foo']]")).to.deep.equal({
        kind: NodeKind.ListValueFunction,
        start: 2,
        end: 39,
        resourceNameOrId: {
          kind: NodeKind.StringLiteral,
          start: 14,
          end: 21,
          value: "rscId"
        },
        apiVersion: {
          kind: NodeKind.StringLiteral,
          start: 23,
          end: 31,
          value: "apiVer"
        },
        properties: [
          {
            kind: NodeKind.StringLiteral,
            start: 33,
            end: 38,
            value: "foo"
          }
        ]
      });
    });

    it("should parse providers function", () => {
      expect(parser.parse("[providers('foo')]")).to.deep.equal({
        kind: NodeKind.ProvidersFunction,
        start: 2,
        end: 18,
        providerNamespace: {
          kind: NodeKind.StringLiteral,
          start: 12,
          end: 17,
          value: "foo"
        },
        properties: []
      });
    });

    it("should parse providers function with resourceType", () => {
      expect(parser.parse("[providers('foo', 'bar')]")).to.deep.equal({
        kind: NodeKind.ProvidersFunction,
        start: 2,
        end: 25,
        providerNamespace: {
          kind: NodeKind.StringLiteral,
          start: 12,
          end: 17,
          value: "foo"
        },
        resourceType: {
          kind: NodeKind.StringLiteral,
          start: 19,
          end: 24,
          value: "bar"
        },
        properties: []
      });
    });

    it("should parse providers function with properties", () => {
      expect(parser.parse("[providers('foo').bar[10]]")).to.deep.equal({
        kind: NodeKind.ProvidersFunction,
        start: 2,
        end: 26,
        providerNamespace: {
          kind: NodeKind.StringLiteral,
          start: 12,
          end: 17,
          value: "foo"
        },
        properties: [
          {
            kind: NodeKind.Identifer,
            start: 19,
            end: 22,
            text: "bar"
          },
          {
            kind: NodeKind.IntegerLiteral,
            start: 23,
            end: 25,
            value: 10
          }
        ]
      });
    });

    it("should parse reference function", () => {
      expect(parser.parse("[reference('foo')]")).to.deep.equal({
        kind: NodeKind.ReferenceFunction,
        start: 2,
        end: 18,
        resourceNameOrId: {
          kind: NodeKind.StringLiteral,
          start: 12,
          end: 17,
          value: "foo"
        },
        properties: []
      });
    });

    it("should parse reference function with apiVersion", () => {
      expect(parser.parse("[reference('foo', 'bar')]")).to.deep.equal({
        kind: NodeKind.ReferenceFunction,
        start: 2,
        end: 25,
        resourceNameOrId: {
          kind: NodeKind.StringLiteral,
          start: 12,
          end: 17,
          value: "foo"
        },
        apiVersion: {
          kind: NodeKind.StringLiteral,
          start: 19,
          end: 24,
          value: "bar"
        },
        properties: []
      });
    });

    it("should parse reference function with properities", () => {
      expect(parser.parse("[reference('foo', 'bar').a.b]")).to.deep.equal({
        kind: NodeKind.ReferenceFunction,
        start: 2,
        end: 29,
        resourceNameOrId: {
          kind: NodeKind.StringLiteral,
          start: 12,
          end: 17,
          value: "foo"
        },
        apiVersion: {
          kind: NodeKind.StringLiteral,
          start: 19,
          end: 24,
          value: "bar"
        },
        properties: [
          {
            kind: NodeKind.Identifer,
            start: 26,
            end: 27,
            text: "a"
          },
          {
            kind: NodeKind.Identifer,
            start: 28,
            end: 29,
            text: "b"
          }
        ]
      });
    });

    it("should parse resourceGroup function", () => {
      expect(parser.parse("[resourceGroup()]")).to.deep.equal({
        kind: NodeKind.ResourceGroupFunction,
        start: 2,
        end: 17,
        properties: []
      });
    });

    it("should parse resourceGroup function with properties", () => {
      expect(parser.parse("[resourceGroup().foo.bar]")).to.deep.equal({
        kind: NodeKind.ResourceGroupFunction,
        start: 2,
        end: 25,
        properties: [
          {
            kind: NodeKind.Identifer,
            start: 18,
            end: 21,
            text: "foo"
          },
          {
            kind: NodeKind.Identifer,
            start: 22,
            end: 25,
            text: "bar"
          }
        ]
      });
    });

    it("should parse resourceId function", () => {
      expect(parser.parse("[resourceId('foo', 'bar' ,'baz')]")).to.deep.equal({
        kind: NodeKind.ResourceIdFunction,
        start: 2,
        end: 33,
        first: {
          kind: NodeKind.StringLiteral,
          start: 13,
          end: 18,
          value: "foo"
        },
        second: {
          kind: NodeKind.StringLiteral,
          start: 20,
          end: 25,
          value: "bar"
        },
        rest: [
          {
            kind: NodeKind.StringLiteral,
            start: 27,
            end: 32,
            value: "baz"
          }
        ]
      });
    });

    it("should parse subscription function", () => {
      expect(parser.parse("[subscription()]")).to.deep.equal({
        kind: NodeKind.SubscriptionFunction,
        start: 2,
        end: 16,
        properties: []
      });
    });

    it("should parse resourceGroup function with properties", () => {
      expect(parser.parse("[subscription().foo.bar]")).to.deep.equal({
        kind: NodeKind.SubscriptionFunction,
        start: 2,
        end: 24,
        properties: [
          {
            kind: NodeKind.Identifer,
            start: 17,
            end: 20,
            text: "foo"
          },
          {
            kind: NodeKind.Identifer,
            start: 21,
            end: 24,
            text: "bar"
          }
        ]
      });
    });
  });
});
