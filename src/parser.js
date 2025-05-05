
class Parser {
  constructor() {
    this.keywords = {
      'neko': 'PRINT',
      'compteneko': 'CALC',
      'nekimg': 'IMAGE',
      'neksite.créer': 'CREATE_SITE',
      'nekjeu.créer': 'CREATE_GAME',
      'nekstyle': 'STYLE',
      'nekscript': 'SCRIPT',
      'moins': 'MINUS',
      'plus': 'PLUS',
      'multiplier': 'MULTIPLY',
      'diviser': 'DIVIDE',
      'si': 'IF',
      'sinon': 'ELSE',
      'boucle': 'LOOP',
      'fonction': 'FUNCTION',
      'retourne': 'RETURN',
      'discordNeko': 'DISCORD',
      'nekoReagit': 'REACT',
      'nekoCommande': 'COMMAND',
      'nekoMessage': 'MESSAGE'
    };
  }

  parse(code) {
    const lines = code.split('\n');
    const ast = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('//')) continue;

      if (line.startsWith('neko = ')) {
        const content = line.match(/\("(.+)"\)/)[1];
        ast.push({ type: 'PRINT', value: content });
      }
      else if (line.startsWith('compteneko = ')) {
        const expr = line.replace('compteneko = ', '').split(' ');
        ast.push({
          type: 'CALC',
          left: Number(expr[0]),
          operator: this.keywords[expr[1]],
          right: Number(expr[2])
        });
      }
      else if (line.startsWith('discordNeko.connexion')) {
        const token = line.match(/\("(.+)"\)/)[1];
        ast.push({ type: 'DISCORD_CONNECT', token });
      }
      else if (line.startsWith('nekoCommande')) {
        const [cmd, response] = line.match(/\("(.+)", "(.+)"\)/)[1].split('", "');
        ast.push({ type: 'DISCORD_COMMAND', command: cmd, response });
      }
      else if (line.startsWith('nekoReagit')) {
        const [msg, emoji] = line.match(/\("(.+)", "(.+)"\)/)[1].split('", "');
        ast.push({ type: 'DISCORD_REACT', message: msg, emoji });
      }
      else if (line.startsWith('boucle')) {
        const count = Number(line.match(/\((\d+)\)/)[1]);
        ast.push({ type: 'LOOP', count });
      }
      else if (line.startsWith('si')) {
        const condition = line.match(/\((.+)\)/)[1];
        ast.push({ type: 'IF', condition });
      }
    }

    return ast;
  }
}

module.exports = Parser;
