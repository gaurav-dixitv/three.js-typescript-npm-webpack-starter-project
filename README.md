# Three.js TypeScript NPM Webpack Starter Project (+ dat.gui, stats.js) - quite a mouthful, yes.

##### Start building amazing experiences today ^^


# Features:

- Three.js 0.89.0 npm module
- TypeScript (with linting)
- 2 custom componenets and a project hierarchy that shows one way of organizing your code
- Webpack
- Separate Development and Distribution builds
- Live server (builds and reloads the browser on changes)
- dat.gui
- stats.js


### TODO:

- Add examples from Three.js
- Travis support


### Folder Structure:
- **assets/** – This is where your assets should go
- **dist/** – Distribution build (minified) lives here
- **node_modules/** – Node modules added with npm install are here
- **src/** – This is where all the code goes
- **templates/** – This is where the html template that gets built by Webpack goes
- **.gitignore** – List of files and folders that are ignored by git
- **package.json** – Node config for the project
- **README.md** – You are reading this :)
- **tsconfig.json** – TypeScript settings
- **webpack.dev.config.js** – Webpack config for the DEV build
- **webpack.dist.config.js** – Webpack config for the DIST build


# Setup:
To get this template up and runnning, you will need just a few commands.

## 0. Install Git:

[GIT Installation Instructions and Links][git-scm]

## 1. Download or Clone this repo:

#### Download:

Download the latest zip/tar.gz and extract it to where you want your project to be.

#### Clone:

Navigate to your workspace directory.

Run:

```git clone https://github.com/gaurav-dixitv/three.js-typescript-npm-webpack-starter-project.git```

## 2. Install node.js and npm (npm is included and installed with node.js):

[NodeJS Installation Instructions and Links][nodejs]

## 3. Install dependencies:

Navigate to the cloned repo’s directory.

Run:

```npm install```

## 4. Run the dev server:

Run to use the dev build while developing:

```npm run server:dev```

Run to use the dist build while developing:

```npm run server:dist```

###### The DEBUG flag allows you to selectively run certain parts of the code - the dist build will help you test your code that will be executed in production. This will also help you test the minified build. Other configuration parameters, such as webservices that point to production when in deployment, can also be tested.

This runs a server that takes you to the browser and reloads anytime you change something.

## Build for testing/developing/debugging:

Run:

```npm run build:dev```

This will build the project with a few caveats;
- A compile time flag, DEBUG, set to true; allowing you to include or not include certain code depending on if it's DEBUG build or not.
- The resulting .js file will not be minified

## Build for release:

Run:

```npm run build:dist```

This will build the project with a few caveats;
- The compile time flag, DEBUG, set to false; allowing you to include or not include certain code depending on if it's DEBUG build or not.
- The resulting .min.js will be minified


## Bugs/Issues?

If you have any issues, please let me know via [GitHub Issues][issues]!

## Requests/Suggestions?

If you have any requests or suggestion, please let me know via [GitHub Issues][issues]!

## Contributing Code?

If you would like to have some of your code included; a new feature, a cleaned up feature, a bugfix, or whatever. Please open up a [Pull Request][pulls]!


[git-scm]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[nodejs]: https://nodejs.org/en/
[issues]: https://github.com/gaurav-dixitv/three.js-typescript-npm-webpack-starter-project/issues
[pulls]: https://github.com/gaurav-dixitv/three.js-typescript-npm-webpack-starter-project/pulls
