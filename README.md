# Server Chassis: Node.js + Express.js + MongoDB + Mocha

Chassis for a REST API using Node.js, Express.js and MongoDB. Tests are run using Mocha.

## Requirements

- `node` v20.11.0
- `npm` v10.2.4

## Basic Usage

- use `npm run start:dev` to run the service in development mode (with `NODE_ENV=dev`).
- use `npm run nodemon` to run the service in development mode (with `NODE_ENV=dev`) using nodemon.
- use `npm run lint` for code linting.
- use `npm test` for executing tests.

App is launched listening on ***8080*** port by default, set the environment variable ***PORT*** to change it.

## Content Description

### src/

This folder contains the app source code:

- `server.js`: functions to start (and stop) app environment: load environment variables, bootstrap app services, set middlewares and when done, init express
- `middlewares`: middlewares to be added to express (i.e. async error handler and custom error handler)
- `routes`: routes definition
- `controllers`: mvc controllers
- `services`: application services
- `models`: app models (i.e. mongoose models)

### test/

This folder contains the tests (and the `_setup.js` file to start app environment because it's not automatically started when importing `server.js` in test files).

## Environment variables

This project depends on some environment variables (from `.env.[environment]` files):

- `MONGODB_URI`: MongoDB connection URI used to connect to a MongoDB database server.

## How was this chassis created?

### Setup steps

1. Create a `package.json` file using `npm init`. Add Node.js and npm versions used:

    ```json
    "engines": {
      "node": ">=20.11.0",
      "npm": ">=10.2.4"
    }
    ```

    Also add `"type": "module"` in order to use `import` instead of `require`.
2. Install express and mongoose: `npm install express mongoose`.
3. Install dev dependencies such as testing ones (supertext, c8, mocha, chai), linter (eslint, eslint-plugin-json-format) and nodemon:
    - `npm install --save-dev supertest c8 mocha chai`
    - `npm install --save-dev eslint eslint-plugin-json-format`
    - `npm install --save-dev nodemon`
4. Configure eslint: `npx eslint --init`.
5. Check the eslint configuration, `.eslintrc.json` file should have:

    ```json
    "env": {
      "node": true,
      "es2021": true,
      "mocha": true
    }
    ```

    Also add `json-format` plugin (the one installed with the dependency `eslint-plugin-json-format`)

    ```json
    "plugins": [
      "json-format"
    ]
    ```

    Add `.eslintignore` file.

6. Create Mocha configuration file `.mocharc.json`. With `exit: true` the server is stopped after executing tests (without the need to click Ctrl+C).
7. Create test coverage configuration file `.c8rc.json`. The params set will be needed for the tests to pass successfully.
8. Create nodemon configuration file `nodemon.json` including the files that should be ignored when being updated.
9. Create npm configuration file `.npmrc` with `engine-strict=true` in order to notify with an error alert when trying to install/test/start something without the correct Node.js and npm versions.
10. Initialize git repository: `git init`. Add `.gitignore` file.
11. Install [Husky](https://typicode.github.io/husky/how-to.html) to execute linter fixes and check tests before a commit is created or pushed: `npm install --save-dev husky`. Install husky git hooks (only once): `npx husky init` and add it to `package.json` script called `prepare`. If you want to make a commit skipping husky pre-commit git hooks you can use `git commit -m "..." -n`; the same occurs when you want to skip pre-push hooks: `git push -n`.
12. Install `lint-staged` to check linting only in staged files before making a commit: `npm install --save-dev lint-staged`. Add configuration file `.lintstagedrc`.
13. Install [CommitLint](https://github.com/conventional-changelog/commitlint) dev dependencies to apply Conventional Commits: `npm install --save-dev @commitlint/cli @commitlint/config-conventional` and create its configuration file `.commitlintrc.json`:

    ```json
    {
      "extends": [
        "@commitlint/config-conventional"
      ]
    }
    ```

14. Add `pre-commit`, `pre-push` and `pre-commit-msg` scripts to be run with husky git hooks:

    ```json
    "pre-commit": "npx lint-staged",
    "pre-commit-msg": "npx --no -- commitlint --edit ${1}",
    "pre-push": "npx NODE_ENV=test c8 --all mocha",
    ```

15. Create `.husky/pre-commit` file to insert command that should be executed before making a commit. This file looks like this:

    ```bash
    npm run pre-commit
    ```

16. Create `.husky/pre-commit-msg` file to insert command that should be executed to check the commit message. This file looks like this:

    ```bash
    npm run pre-commit-msg
    ```

17. Create `.husky/pre-push` file to insert command that should be executed before pushing a commit. This file looks like this:

    ```bash
    npm run pre-push
    ```

    If tests fail, commit won't be pushed.

### Development steps

1. Create `index.js` and `src/server.js`.
2. Add routes folder and `routes.js`. Add routing middleware in `server.js`: `app.use("/", routes);`.
3. Add controllers folder and `controller.js`.
4. Add services folder and `service.js` file.
5. Add mongoose models in folder models.
6. Add `Dockerfile` and `.dockerignore`. After that, you can create de docker image and run the docker container with the following commands:

    ```bash
    docker build -t [IMAGE_NAME] .
    docker run --name [CONTAINER_NAME] -p 8080:8080 -t -d [IMAGE_NAME]
    ```

7. Configure GitHub Action in `.github/workflows/main.yaml`.