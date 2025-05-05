
#!/usr/bin/env node
const { program } = require('commander');
const NekoScript = require('./index');

program
  .command('télécharger')
  .description('Télécharge NekoScript')
  .action(() => {
    console.log('NekoScript installé! 🐱');
  });

program
  .command('publish <nom>')
  .description('Publie une bibliothèque NekoScript')
  .action((nom) => {
    console.log(`Publication de ${nom} en cours...`);
  });

program.parse(process.argv);
