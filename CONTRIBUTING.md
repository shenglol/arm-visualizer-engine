# How to Contribute

## Getting Started

* Run: `npm install` inside your project to install dependencies.
* Run: `npm install typings -g` (If [typings](https://www.npmjs.com/package/typings) is not installed before run this command).
* Run:`npm install github:gulpjs/gulp#4.0 -g` to install [Gulp](https://www.npmjs.com/package/gulp) globally.
* Run: `typings install` to install TypesSript Definitions.
* Follow the Complete Directory Layout to get to know about the project.

### Complete Directory Layout

```
.
├── /conf/                      # Contains configuration files for gulp and karma
│   ├── /gulp.conf.js           # Gulp config file
│   ├── /karma-auto.conf.js     # Karma auto run config file
│   └── /karma.conf.js          # Karma config file
├── /gulp/                      # The folder contains gulp tasks required to build the project
│   ├── /clean.js               # Clean tasks required for the prject
│   ├── /compile.js             # Compiles the project from source to output(lib) folder
│   ├── /karma.js               # Karma test tasks
│   ├── /lint.js                # Common lint support with jshint and tslint
│   └── /version.js             # Version update tasks
├── /lib/                       # The folder for compiled output with typings for node module consume
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code(.ts) of the application
│   ├── /constants              # Contains constants
│   ├── /expression             # Contains ARM Template expressions base types and concrete types
│   ├── /template               # Contains ARM Template implementation
│   └── /index.ts               # Expose the acceseble properties by outside
├── /test/                      # Contain tests(.ts) for all the source files
├── /typings/                   # Typings files for specific node modules for the project
├── .editorconfig               # Define and maintain consistent coding styles between different editors and IDEs
├── .gitattributes              # Defining attributes per path
├── .gitignore                  # Contains files to be ignored when pushing to git
├── .jshintrc                   # JShint rules for the project
├── .npmignore                  # Contains files to be ignored when pushing to npm
├── .npmrc                      # NPM config file
├── CONTRIBUTING.md             # Shows how to contribute to your module
├── gulpfile.js                 # Link all splittered gulp tasks  
├── LICENSE                     # Contains License Agreement file
├── package.json                # Holds various metadata relevant to the project
├── README.md                   # Contains the details of the generated project
├── tsconfig.json               # Contains typescript compiler options
├── tslint.json                 # Lint rules for the project
└── typings.json                # Typings information to generate typings folder
```

## Technologies

Usage          	            | Technology
--------------------------	| --------------------------
Javascript Framework        | Typescript
Unit Testing Framework     	| Mocha and Chai
Unit Test Runner           	| Karma
Build Tool                	| Gulp
Code Quality Tools         	| JS Hint, TS Lint
Dependency Registries      	| NPM

## How to Use

Here is the list of tasks available out of the box and run these via `npm run <task>`
```
  build             Perform npm build
  clean             Cleans lib directory
  test              Run spec tests
  test:auto         Run auto spec tests
```

