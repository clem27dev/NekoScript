
const commander = require('commander');
const program = new commander.Command();
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const NekoScript = require('./index');

program
  .version('1.0.0')
  .description('NekoScript - Un langage de programmation français simple et créatif 🐱');

program
  .command('nouveau <nom>')
  .description('Crée un nouveau projet NekoScript')
  .action((nom) => {
    const dir = `./${nom}`;
    fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/main.neko`, '// Mon projet NekoScript\n');
    console.log(chalk.green(`✨ Projet ${nom} créé!`));
  });

program
  .command('executer <fichier>')
  .description('Exécute un fichier NekoScript')
  .action((fichier) => {
    try {
      if (!fs.existsSync(fichier)) {
        console.log(chalk.red(`❌ Le fichier ${fichier} n'existe pas!`));
        return;
      }
      const neko = new NekoScript();
      const code = fs.readFileSync(fichier, 'utf-8');
      neko.execute(code);
    } catch (error) {
      console.error(chalk.red('❌ Erreur:'), error.message);
    }
  });

program
  .command('publier <nom>')
  .description('Publie un package NekoScript')
  .action((nom) => {
    const packagePath = path.join(process.cwd(), 'neko.json');
    if (!fs.existsSync(packagePath)) {
      console.log(chalk.red('❌ Fichier neko.json manquant!'));
      return;
    }
    const pkg = require(packagePath);
    console.log(chalk.green(`📦 Publication de ${nom} v${pkg.version}...`));
  });

program
  .command('installer <package>')
  .description('Installe un package NekoScript')
  .action(async (package) => {
    try {
      const pm = new NekoPackageManager();
      await pm.installPackage(package);
      console.log(chalk.green(`✅ ${package} installé avec succès!`));
    } catch (error) {
      console.error(chalk.red('❌ Erreur:'), error.message);
    }
  });

program.parse(process.argv);
