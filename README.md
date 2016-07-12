# ArmViz Engine
ArmViz engine is a tool to resolve and edit Azure Resource Manager Templates.

## Building
Install Gulp, TypeScript, Typings and dev dependencies:

```
npm install -g gulp typescript typings
npm install
```

Install types:

```
typings install
```

Use one of the following to build and test:

```
gulp build           # Compiles all TypeScript source files and updates module references
gulp clean           # Cleans the generated js files from lib directory
gulp help            # Display this help text.
gulp test            # Runs the Jasmine test specs [build]
gulp tslint          # Lints all TypeScript source files
gulp watch           # Watches ts source files and runs build on change
```
