
class Interpreter {
  interpret(ast) {
    for (const node of ast) {
      switch (node.type) {
        case 'PRINT':
          console.log(node.value);
          break;
        case 'CALC':
          const result = this.evaluateOperation(node);
          console.log(result);
          break;
      }
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
}

module.exports = Interpreter;
