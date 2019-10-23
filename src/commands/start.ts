
  import { GluegunToolbox } from 'gluegun'
  

  module.exports = {
    name: 'start',
    alias: ['s', 'dev'],
    run: async (toolbox: GluegunToolbox) => {
      const {
        print: {success},
        system,
        filesystem
      } = toolbox
  
      
      success("Zamzon is starting your server at http://localhost:8888")

      const hasYarn = filesystem.exists('yarn.lock')


      await system.run(hasYarn ? 'yarn dev:lambda' : 'npm run dev:lambda')

      
  
    },
  }
  