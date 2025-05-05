
const Parser = require('./src/parser');
const Interpreter = require('./src/interpreter');
const DiscordAPI = require('./lib/discord.neko');

class NekoScript {
  constructor() {
    this.parser = new Parser();
    this.interpreter = new Interpreter();
  }

  execute(code) {
    const ast = this.parser.parse(code);
    return this.interpreter.interpret(ast);
  }
}

module.exports = NekoScript;
