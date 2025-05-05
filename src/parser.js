
class Parser {
  constructor() {
    this.keywords = {
      'neko': 'PRINT',
      'compteneko': 'CALC',
      'nekimg': 'IMAGE',
      'moins': 'MINUS',
      'plus': 'PLUS',
      'multiplier': 'MULTIPLY',
      'diviser': 'DIVIDE'
    };
  }

  parse(code) {
    // Basic parser implementation for NekoScript syntax
    const lines = code.split('\n');
    const ast = [];

    for (const line of lines) {
      if (line.startsWith('neko = ')) {
        const content = line.match(/\("(.+)"\)/)[1];
        ast.push({
          type: 'PRINT',
          value: content
        });
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
    }

    return ast;
  }
}

module.exports = Parser;
