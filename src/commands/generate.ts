
  import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
      filesystem
    } = toolbox

    const params = parameters.array

    const pkg = `${filesystem.cwd()}/package.json`
    
    const db = filesystem.read(pkg, 'json')

    console.log(db.config.db)

    if(params[0] && params[0] === 'scaffold') {
      const title = params[1]
      const data = params.slice(2, params.length)

      

      if(!title) {
        info(`You must name your scaffold`)
      } else {

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
  
        info(`Generated file`)
      }
      


    

    } else {
      info(`You forgot the type you want to generate`)
      return
    }


  },
}
