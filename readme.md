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

Zamzon is a CLI tool that helps initialize projects that work with Netlify. Connect a datasource, scaffold CRUD routes and work with any static generator.


# Quick Start


```shell
yarn global add zamzon
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

**Choosing a datasource:**<br>
Currently, only mongodb is supported.<br>
There are plans to add more in the future.<br>
Not selecting a datasource is totally acceptable.
## generate

Generate functions:

### scaffold
```shell
zamzon generate scaffold Todo title:string done:boolean
```

When you have your datasource set to mongodb, the scaffold will make a model file, in this case named Todo. It will parse the following parameters and create a schema for you automatically.<br>
If no datasource is set, it will skip making a model file.

### route
```shell
zamzon generate route sendemail
```

Sometimes you don't need every route scaffolding supplies. So you can generate a single route. **Don't use spaces or special characters. An update will come soon with validation**

## start

```shell
zamzon start
```

Runs the server in dev mode. Must be in the root of the directory of your project.<br>
<br>
You can access your functions at `/.netlify/functions/`

