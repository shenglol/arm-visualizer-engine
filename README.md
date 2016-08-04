# ARMVIZ 2.0 Engine
> ARMVIZ 2.0 Engine is a core component for [ARMVIZ 2.0](https://github.com/msshli/arm-visualizer). It is a tool for loading, resolving and editing Azure Resource Manager Templates.

## Installation

```
npm install arm-visualizer-engine --save
```

## Examples

### Load a template

```js
import { ARMTemplate } from 'arm-visualizer-engine';

let template = new ARMTemplate();
template.load(`{
    "$schema": "",
    "contentVersion": "",
    "parameters": {},
    "resources": [{
        "name": "resourceA" 
    }]
}`);

console.log(template.resources[0]); // { "name": "resourceA" }
```

### Parse an expression


```js
import { ARMTemplate } from 'arm-visualizer-engine';

let template = new ARMTemplate();
template.load(`{
    "$schema": "",
    "contentVersion": "",
    "parameters": {
        "username": {
            "type": "string",
            "defaultValue": "foo"
        }
    },
    "resources": []
}`);

console.log(template.parser.parse("[parameters('username')]"));  // 'foo'
```

### Resolve dependencies

```js
import { Resource, ARMTemplate } from 'arm-visualizer-engine';

let template = new ARMTemplate();
template.load(`{
    "$schema": "",
    "contentVersion": "",
    "parameters": {},
    "resources": [
        {
            ...,
            name: "resourceA",
            type: "typeA",
            dependsOn: [
                "[concat('typeB', 'resourceB')]"
                "[resourceId('typeC', 'resourceC')]"
            ]
        },
        {
            ...,
            name: "resourceB",
            type: "typeB"
        },
        {
            ...,
            name: "resourceC",
            type: "typeC"
        }
    ]
}`);

let dependencies = template.resolveDependencies(template.resources[0]);
console.log(dependencies[0]); // resourceB
console.log(dependencies[1]); // resourceC

```

## How to Contribute
Read [this](https://github.com/msshli/arm-visualizer-engine/blob/master/CONTRIBUTING.md) to contribute.

[Referred via](https://github.com/joeybaker/generator-iojs)

## License

Copyright (c) Shenglong Li.
This source code is licensed under the Apache-2.0 license.
