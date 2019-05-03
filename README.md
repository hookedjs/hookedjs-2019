HookedJS
=====================

Is a Full-Stack client-server framework, featuring React, Mobx, Apollo, GraphQL, Typescript, PostgreSQL, and Webpack.

The app is currently unstable.

Install
---
```
nvm use 11
npm i -g solidarity webpack typescript yarn
yarn lerna:bootstrap
```

Getting Started
---
For now, only the React app is working because the backend is being fully refactored.

First install the dependencies:
- [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://yarnpkg.com/en/)
- [solidarity](https://github.com/infinitered/solidarity)
- [docker](https://docs.docker.com/install/)

HookedJS may also require native build tools like Xcode or build-utils, but we need to confirm that. 

Dependencies except for docker can all be installed these commands.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm install 11
nvm use 11
nvm alias default 11
npm install -g yarn solidarity
```


To create a new HookedJS app, use our CLI like so:

```
nvm use 11
npx hookedjs --create
```

This will create a HookedJS app from the boilerplate app within the HookedJS source code and install dependencies. Within a HookedJS app, check out the package.json to see the available commands to start the app and run the app in development mode.


Contributing
---
Contributions are welcome! We've created a highly productive development environment that can be bootstraped using our CLI like so:

`npx hookedjs --create-dev`

This will clone the source code of HookedJS, 



License
---
ISC
