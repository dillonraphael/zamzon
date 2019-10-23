<!-- 
```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```
 -->


[![Twitter Follow](https://img.shields.io/twitter/follow/dillonraphael?style=social)](https://twitter.com/dillonraphael)

# Zamzon

<!-- ![gluegun](https://user-images.githubusercontent.com/1479215/50237287-5a23e380-0371-11e9-89ea-85b41cd25217.jpg) -->

Zamzon is a CLI tool that helps initialize projects that work with Netlify. Connect a datasource, scaffold CRUD routes and work with any static generator.


# Quick Start


```shell
yarn global add zamzon
cd Desktop
zamzon init ProjectName
cd ProjectName
zamzon g scaffold Todo
zamzon start or yarn dev:lambda
```


# Commands

## init

```shell
zamzon init <project>
```
## generate

Generate functions:

**scaffold**
```shell
zamzon generate scaffold Todo title:string done:boolean
```

**route**
```shell
zamzon generate route sendemail
```
## start

Runs the server in dev mode

```shell
zamzon start
```


