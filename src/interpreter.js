
const Discord = require('discord.js');

class Interpreter {
  constructor() {
    this.discord = null;
    this.variables = new Map();
  }

  async interpret(ast) {
    try {
      for (const node of ast) {
        await this.executeNode(node);
      }
    } catch (error) {
      console.error('❌ Erreur:', error.message);
    }
  }

  async executeNode(node) {
    switch (node.type) {
      case 'PRINT':
        console.log(node.value);
        break;

      case 'CALC':
        const result = this.evaluateOperation(node);
        console.log(result);
        break;

      case 'DISCORD_CONNECT':
        if (!this.discord) {
          this.discord = new Discord.Client({
            intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
          });
          await this.discord.login(node.token);
          console.log('🐱 Bot Discord connecté!');
          
          // Configuration des événements de base
          this.discord.on('ready', () => {
            console.log(`Connecté en tant que ${this.discord.user.tag}`);
          });
        }
        break;

      case 'DISCORD_COMMAND':
        if (!this.discord) throw new Error('Discord non connecté!');
        this.discord.on('message', msg => {
          if (msg.content === `!${node.command}`) {
            msg.channel.send(node.response);
          }
        });
        break;

      case 'DISCORD_REACT':
        if (!this.discord) throw new Error('Discord non connecté!');
        this.discord.on('message', msg => {
          if (msg.content === node.message) {
            msg.react(node.emoji);
          }
        });
        break;

      case 'LOOP':
        for (let i = 0; i < node.count; i++) {
          console.log(`Itération ${i + 1}`);
        }
        break;

      case 'IF':
        const condition = this.evaluateCondition(node.condition);
        if (condition) {
          // Execute le bloc if
        }
        break;
    }
  }

  evaluateOperation(node) {
    switch (node.operator) {
      case 'MINUS': return node.left - node.right;
      case 'PLUS': return node.left + node.right;
      case 'MULTIPLY': return node.left * node.right;
      case 'DIVIDE': return node.left / node.right;
    }
  }

  evaluateCondition(condition) {
    // Simple evaluation for now
    return eval(condition);
  }
}

module.exports = Interpreter;
