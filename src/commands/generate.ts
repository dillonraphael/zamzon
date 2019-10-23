
  import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
      filesystem,
      prompt
    } = toolbox

    const params = parameters.array

    const pkg = `${filesystem.cwd()}/package.json`
    
    const db = filesystem.read(pkg, 'json')

    if(params[0] && params[0] === 'scaffold') {
      const title = params[1]
      const data = params.slice(2, params.length)

      if(!title) {
        info(`You must name your scaffold`)
      } else {


        // If db is set to mongodb in config, create the model
        if(db.config.db === 'mongodb') {

          await generate({
            template: 'functions/models/model.ts.ejs',
            target: `functions/models/${title.charAt(0).toUpperCase() + title.slice(1)}.js`,
            props: { title, data }
          })

        }

        await generate({
          template: 'functions/routes/route.ts.ejs',
          target: `functions/routes/create-${title.charAt(0).toLowerCase() + title.slice(1)}.js`,
          props: { title, data, method: 'POST', db: db.config.db }
        })

        await generate({
          template: 'functions/routes/route.ts.ejs',
          target: `functions/routes/get-${title.charAt(0).toLowerCase() + title.slice(1)}.js`,
          props: { title, data, method: 'GET', db: db.config.db}
        })

        await generate({
          template: 'functions/routes/route.ts.ejs',
          target: `functions/routes/update-${title.charAt(0).toLowerCase() + title.slice(1)}.js`,
          props: { title, data, method: 'PUT', db: db.config.db}
        })

        await generate({
          template: 'functions/routes/route.ts.ejs',
          target: `functions/routes/delete-${title.charAt(0).toLowerCase() + title.slice(1)}.js`,
          props: { title, data, method: 'DELETE', db: db.config.db }
        })
  
        info(`Generated files`)
      }
      
    } else if(params[0] && params[0] === 'route') {
      let title = ''
      let method = ''

      if(params[1]) {
        title = params[1].charAt(0).toLowerCase() + params[1].slice(1)
        const askMethod = {
          type: 'select',
          name: 'method',
          message: 'What kind of http method?',
          choices: ['GET', 'POST', 'PUT', 'DELETE'],
        }

        const questions = [ askMethod]
        const answers = await prompt.ask(questions)

        method = answers.method

      } else {
        const askTitle = { 
          type: 'input', 
          name: 'title', 
          message: 'Name your route. No spaces.' 
        }

        const askMethod = {
          type: 'select',
          name: 'method',
          message: 'What kind of http method?',
          choices: ['GET', 'POST', 'PUT', 'DELETE'],
        }

        const questions = [askTitle, askMethod]
        const answers = await prompt.ask(questions)

        title = answers.title
        method = answers.method
      }

      await generate({
        template: 'functions/routes/route.ts.ejs',
        target: `functions/routes/${title.charAt(0).toLowerCase() + title.slice(1)}.js`,
        props: { title, method, db: db.config.db }
      })
    } else {
      info(`You forgot the type you want to generate`)
      return
    }


  },
}
