
  import { GluegunToolbox } from 'gluegun'
  

  module.exports = {
    name: 'init',
    alias: ['new', 'i'],
    run: async (toolbox: GluegunToolbox) => {
      const {
        parameters,
        template: { generate },
        filesystem,
        print: { info, error },
        prompt,
        system
      } = toolbox
  
      const name = parameters.first
  
      if (filesystem.exists(name)) {
        info(``)
        error(`There's already a folder named ${name} here.`)
        const answer = await prompt.confirm(`Do you want to overwrite it?`)
        if (answer) {
          filesystem.remove(name)
        } else {
          return undefined
        }
      }

      await filesystem.dir(name)

      const { dbtype } = await prompt.ask({
        type: 'select',
        name: 'dbtype',
        message: 'Choose a datasource',
        choices: [
          'Mongodb',
          'None'
        ],
      })

      const yarnOrNpm = await system.which('yarn') ? 'yarn' : 'npm'
      await system.exec(`${yarnOrNpm} install`, {cwd: name});


      let url = ''

      if(dbtype && dbtype.toLowerCase() === 'mongodb') {
        const getDbUrl = { type: 'input', name: 'dburl', message: 'Please enter a mongodb url' }
        const { dburl } = await prompt.ask(getDbUrl)
        url = dburl
      }

      await generate({
        template: 'functions/utils/validateHttpMethod.ts.ejs',
        target: `./${name}/functions/utils/validateHttpMethod.js`,
      })

      await generate({
        template: 'functions/utils/serverError.ts.ejs',
        target: `./${name}/functions/utils/serverError.js`,
      })

      await generate({
        template: 'netlify.toml.ejs',
        target: `./${name}/netlify.toml`,
      })

      await generate({
        template: 'package.json.ejs',
        target: `./${name}/package.json`,
        props: {db: dbtype.toLowerCase()}
      })

      await generate({
        template: '.env.ejs',
        target: `./${name}/.env`,
        props: url && {dburl: url}
      })
      

  
    },
  }
  