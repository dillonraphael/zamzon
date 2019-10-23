
  import { GluegunToolbox } from 'gluegun'
  

  module.exports = {
    name: 'start',
    alias: ['s', 'dev'],
    run: async (toolbox: GluegunToolbox) => {
      const {
        system
      } = toolbox
  
      
      const yarnOrNpm = system.which('yarn') ? 'yarn' : 'npm'
      await system.spawn(`${yarnOrNpm} install && ${yarnOrNpm} run dev:lambda`, {
        shell: true,
        stdio: 'inherit',
      })

      
  
    },
  }
  