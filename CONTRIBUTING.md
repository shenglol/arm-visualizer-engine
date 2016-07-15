# How to Contribute

We're open source! We love contributions! An ordered list of helpful things:

1. failing tests
2. patches with tests
3. bare patches
4. bug reports
5. problem statements
6. feature requests

[via](https://twitter.com/othiym23/status/515619157287526400)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Creating Issues](#creating-issues)
  - [Bug Issues](#bug-issues)
  - [Feature Issues](#feature-issues)
  - [Assignees](#assignees)
  - [Milestones](#milestones)
  - [Labels](#labels)
- [Developing](#developing)
  - [Getting Started](#getting-started)
  - [Complete Directory Layout](#complete-directory-layout)
- [Technologies](#technologies)
- [How to Use](#how-to-use)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Creating Issues
GitHub issues can be treated like a massive, communal todo list. If you notice something wrong, toss an issue in and we'll get to it!

**TL;DR Put issues into the right milestone if avaliable. Don't create new milestones or labels. Talk to the responsible person on a milestone before adding issues to a milestone that have a due date.**

### Bug Issues
* mark with the "bug" label
* The following things are helpful
    * screenshots with a description showing the problem.
    * js console or server logs
    * contact information of users who experienced this request
    * the time of the bug so that relevant logs can be found
* The following things should always be included
    * the steps it would take to reproduce the issue
    * what happened when you followed those steps
    * what you expected to happen that didn't

### Feature Issues
* should be marked with the "enhancement" label

### Assignees
* assignees are responsible for completing an issue. Do not assign a person to an issue unless they agree to it. Generally, people should assign themselves.

### Milestones
* If your issue fits into a milestone please add it there. Issues with no milestone are fine – they'll be gone through periodically and assigned.
* Creation of new milestones is by group consensus only. Don't do it on your own.
* A milestone with a due date should have a "responsible person" listed in the description. That doesn't mean that person is the sole person to work on it, just that they're the one responsible for coordinating efforts around that chunk of work.
* → Once a milestone has a due date, only issues okay'd by the responsible person can be added. This ensures that a chunk of work can be delivered by the promised due date.

### Labels
* issues don't get a "prioritize this!" or "CRITICAL" label unless they really apply. "I want this new feature now" does not qualify as important. Generally, these labels should only be applied by people setting up a batch of work. Abuse these labels and they'll become meaningless.
* Creation of new labels is by group consensus. Don't do it on your own!

Some good ways to make sure it's not missed:
* try to add any appropriate labels.
* If this is a browser bug, add the "browser" label, and prefix your issue title with the browser version and the URL you encountered the problem on. e.g. `IE 9: /wisps/xxx can't click on the search input`
* screenshots are always handy
* If your issue is urgent, there's probably a milestone that it belongs in.

## Developing

* Please follow the styleguide: https://github.com/joeybaker/styleguide-js and https://github.com/joeybaker/styleguide-css
* Please add tests
* Please write meaningful commit messages. Keep them somewhat short and meaningful. Commit messages like “meh”, “fix”, “lol” and so on are useless. Your are writing to your future self and everyone else. It’s important to be able to tell what a commit is all about from its message.

    “Write every commit message like the next person who reads it is an axe-wielding maniac who knows where you live”.

    Good commit messages:
    ![good commit messages](https://www.rainforestqa.com/images/version-control-best-practices/good-commit-messages-2fba507c.png)

    [via](https://blog.rainforestqa.com/2014-05-28-version-control-best-practices/)

* Thank you for contributing!

### Getting Started

* Run: `npm install` inside your project to install dependencies.
* Run: `npm install typings -g` (If [typings](https://www.npmjs.com/package/typings) is not installed before run this command)
* Run:`npm install gulp -g` to install [Gulp](https://www.npmjs.com/package/gulp) globally
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
├── CHANGELOG.md                # Detailed recent changes in the versions
├── CONTRIBUTING.md             # Shows how to contribute to your module
├── gulpfile.js                 # Link all splittered gulp tasks  
├── LICENSE                     # Contains License Agreement file
├── package.json                # Holds various metadata relevant to the project
├── PULL_REQUEST_TEMPLATE.md    # Shows how to make pull request to you project
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
Coverage Generator         	| Istanbul
Documentation              	| Typedoc
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
  patch             Update patch version and create tag
  feature           Update feature version and create tag
  release           Update release version and create tag
```

