/// <reference types="@types/node" />

import * as fs from "fs";
import * as PEG from "pegjs";

import { Node } from "./nodes";

export class Parser {
  private static _instance: Parser;
  private parser: PEG.Parser;

  private constructor() {
    let grammar = fs.readFileSync("src/expression/grammar.pegjs", "utf-8").toString();
    this.parser = PEG.generate(grammar);
  }

  static get instance(): Parser {
    return this._instance || (this._instance = new this());
  }

  parse(expr: string): Node {
    return <Node>this.parser.parse(expr);
  }
}

export const parser = Parser.instance;
