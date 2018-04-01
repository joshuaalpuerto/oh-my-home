# Oh My Home Documentation
[![Travic CI](https://travis-ci.org/joshuaalpuerto/oh-my-home.svg?branch=master)](https://travis-ci.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![Dependecies](https://david-dm.org/joshuaalpuerto/oh-my-home/status.svg)
![Dev Dependecies](https://david-dm.org/joshuaalpuerto/oh-my-home/dev-status.svg)
[![Coverage Status](https://coveralls.io/repos/github/joshuaalpuerto/oh-my-home/badge.svg?branch=master)](https://coveralls.io/github/joshuaalpuerto/oh-my-home?branch=master)

#### Demo:
[https://oh-my-home.netlify.com/](https://oh-my-home.netlify.com/)

## Development Environment Setup

1. Make sure you have `nvm`, node `v8.9.0 and up` installed
2. Install `yarn` - `npm install -g yarn@0.27.5`.
3. Use a smart `.npmrc`. By default, `npm` doesn’t save installed dependencies to package.json (and you should always track your dependencies!).
4. `npm install -g standard@10.0.3` # standardjs
5. `npm install -g babel-eslint@8.0.3`
6. `npm install -g snazzy`

```bash
$ npm config set save=true
$ npm config set save-exact=true
$ cat ~/.npmrc
```

When adding new packages, always use `yarn add --exact <package>`. To add a package as a devDependency, use `yarn add --exact -D <package>`. This will ensure the package is always added to the `yarn.lock` file.

## Quick start

Make sure you have `nvm`, node `v8.9.0`, and `yarn` installed before proceeding with the following steps. Also, ensure :

1. Clone repo - `git clone git@github.com:joshuaalpuerto/oh-my-home.git`
2. Run `yarn` to install dependencies and clean the git repo.
3. Run `yarn start` to see the app at `http://localhost:3000`.

To build and test production build:

1. Run `yarn run build` to build the app.
2. Run `yarn run start:prod` to run the app in production mode. Make sure there are no errors in the browser console log.

### Application Folder Structure

The `[`app/`](../../../tree/master/app)` directory contains your entire application code, including CSS, JavaScript, HTML and tests.

The rest of the folders and files only exist to make your life easier, and
should not need to be touched.

Some files left out for brevity.

```
.
├── app/
|   ├── components
|   |   └── Button
|   |       ├── index.js
|   |       └── tests
|   |           └── index.test.js
|   ├── containers
|   |   ├── App
|   |   |   ├── tests
|   |   |   |   ├── actions.js
|   |   |   |   ├── index.test.js
|   |   |   |   └── reducer.test.js
|   |   |   ├── actions.js
|   |   |   ├── constants.js
|   |   |   ├── index.js
|   |   |   ├── sagas.js
|   |   |   └── reducer.js
|   |   |
|   ├── tests
|   ├── utils
|   └── index.js
├── build/
├── docs/
├── internals/
├── server/
├── .editorconfig
├── .gitattributes
└── .gitignore
└── package.json
```

### Building & Deploying

1. Run `npm run build`, which will compile all the necessary files to the
`build` folder.

2. Upload the contents of the `build` folder to your web server's root folder.


### CSS

This boilerplate uses [styled-components](https://github.com/styled-components/styled-components) allowing you to write your CSS in your JavaScript, removing the mapping between styles and components.

`styled-components` let's us embrace component encapsulation while `sanitize.css` gives us data-driven cross-browser normalization.

See the [PostCSS Documentation](https://github.com/postcss/postcss) for more information about PostCSS
and CSS modules.

### JS

The app bundles all your clients-side scripts and chunk them into several files using
code splitting where possible. Your code is automatically optimized when
building for production so you don't have to worry about that.

### SEO

App uses [react-helmet](https://github.com/nfl/react-helmet) for managing document head tags. Examples on how to
write head tags can be found [here](https://github.com/nfl/react-helmet#examples).

### Testing
- [jest](https://facebook.github.io/jest/) - Complete and easy to set-up JavaScript testing solution. Works out of the box for any React project. 
- [enzyme](https://github.com/airbnb/enzyme) - JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.

#### CLI
- `yarn test` - run all unit test
- `yarn test:watch` - run all unit tests and watch it interactively.
- `yarn test:coverage` - run all unit test with coverage.

### Pre-commit

Adding `pre-commit` to your project can be helpful to encourage consistency and quality of your code repository.

- [pre-commit](https://github.com/observing/pre-commit) - **pre-commit** is a pre-commit hook installer for `git`. It will ensure that your `npm test` (or other specified scripts) passes before you can commit your changes. This all conveniently configured in your `package.json`.
- [lint-staged](https://github.com/okonet/lint-staged) - Linting makes more sense when running before committing your code. By doing that you can ensure no errors are going into repository and enforce code style. But running a lint process on a whole project is slow and linting results can be irrelevant. Ultimately you only want to lint files that will be committed.

## JavaScript Standard Style

### The Rules

- **2 spaces** – for indentation
- **Single quotes for strings** – except to avoid escaping
- **No unused variables** – this one catches *tons* of bugs!
- **No semicolons** – [It's][1] [fine.][2] [Really!][3]
- **Never start a line with `(`, `[`, or `` ` ``**
  - This is the **only** gotcha with omitting semicolons – *automatically checked for you!*
  - [More details][4]
- **Space after keywords** `if (condition) { ... }`
- **Space after function name** `function name (arg) { ... }`
- Always use `===` instead of `==` – but `obj == null` is allowed to check `null || undefined`.
- Always handle the node.js `err` function parameter
- Always prefix browser globals with `window` – except `document` and `navigator` are okay
  - Prevents accidental use of poorly-named browser globals like `open`, `length`,
    `event`, and `name`.
- **And [more goodness](https://standardjs.com/)**

## Contributing

Use [GitHub Flow](https://guides.github.com/introduction/flow/) when contributing code to the repository. It is a workflow where deployments are made regulary.

There's only one rule -- anything on `master` branch is always deployable.
