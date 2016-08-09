# ARMVIZ 2.0 Engine
> ARMVIZ 2.0 Engine is a core component for [ARMVIZ 2.0](https://github.com/msshli/arm-visualizer). It is a tool for loading, resolving and editing Azure Resource Manager Templates.

## Installation

```
npm install arm-visualizer-engine --save
```

## Examples

### get all resources

```js
import { TemplateEngine } from 'arm-visualizer-engine';

let engine = new TemplateEngine();
engine.loadTemplate(`{
    "$schema": "",
    "contentVersion": "",
    "parameters": {},
    "resources": [
        {
            ...
            "name": "resourceA",
            "resources": [
                {
                    ...
                    "name": "resourceB"
                }
            ]
        },
        {
            ...
            "name": "resourceC",
        }
    ]
}`);

console.log(engine.getAllResources()); // [resourceA, resourceB, resourceC];
```

### Resolve an expression in template


```js
import { TemplateEngine } from 'arm-visualizer-engine';

let engine = new TemplateEngine();
engine.loadTemplate(`{
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

console.log(engine.resolveExpression("[parameters('username')]"));  // 'foo'
```

### Get dependencies of a resource

```js
import { Resource, ARMTemplate } from 'arm-visualizer-engine';

let engine = new TemplateEngine();
engine.load(`{
    "$schema": "",
    "contentVersion": "",
    "parameters": {},
    "resources": [
        {
            "name": "resourceA",
            "type": "typeA",
            ...
            "resources": [
                {
                    "name": "resourceB",
                    "type": "typeB",
                    ...
                }
            ]
        },
        {
            "name": "resourceC",
            "type": "typeC",
            ...
            "dependsOn": [
                "[resourceId('typeA', 'resourceA')]",
                "[concat('typeA', 'resourceA', 'typeB', 'resourceB')]"
            ]
        },
    ]
}`);

let dependencies = engine.getDependencies(engine.template.resources[0]);
console.log(dependencies[0]);   // resourceA
console.log(dependencies[1]);   // resourceB

```

## How to Contribute
Read [this](https://github.com/msshli/arm-visualizer-engine/blob/master/CONTRIBUTING.md) to contribute.

[Referred via](https://github.com/joeybaker/generator-iojs)

## License

Copyright (c) Shenglong Li.
This source code is licensed under the Apache-2.0 license.
