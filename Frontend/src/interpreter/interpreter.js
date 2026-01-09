import { TokenType } from './lexer.js';

export class Interpreter {
  constructor() {
    this.variables = {};
    this.output = [];
    this.inputQueue = [];
    this.inputCallback = null;
    this.executionStack = [];
    this.currentIndex = 0;
    this.isWaitingForInput = false;
    this.ast = null;
  }

  reset() {
    this.variables = {};
    this.output = [];
    this.inputQueue = [];
    this.executionStack = [];
    this.currentIndex = 0;
    this.isWaitingForInput = false;
  }

  setInputCallback(callback) {
    this.inputCallback = callback;
  }

  provideInput(value) {
    // Try to parse as number, otherwise keep as string
    const num = parseFloat(value);
    const finalValue = isNaN(num) ? value : num;
    this.inputQueue.push(finalValue);
    this.isWaitingForInput = false;
  }

  write(value) {
    this.output.push(value);
  }

  requestInput(variableName) {
    this.isWaitingForInput = true;
    if (this.inputCallback) {
      this.inputCallback(variableName);
    }
  }

  hasInput() {
    return this.inputQueue.length > 0;
  }

  getInput() {
    return this.inputQueue.shift();
  }

  // Execute the entire program
  execute(ast) {
    this.reset();
    this.ast = ast;
    this.buildExecutionStack(ast.statements);
    
    while (this.currentIndex < this.executionStack.length && !this.isWaitingForInput) {
      this.executeStep();
    }
    
    return {
      output: this.output,
      variables: { ...this.variables },
      isWaitingForInput: this.isWaitingForInput,
      completed: this.currentIndex >= this.executionStack.length
    };
  }

  // Execute one step
  step(ast = null) {
    if (ast && !this.ast) {
      this.reset();
      this.ast = ast;
      this.buildExecutionStack(ast.statements);
    }

    if (this.isWaitingForInput) {
      throw new Error('En attente d\'une entrée utilisateur');
    }

    if (this.currentIndex >= this.executionStack.length) {
      return {
        output: this.output,
        variables: { ...this.variables },
        isWaitingForInput: false,
        completed: true
      };
    }

    this.executeStep();

    return {
      output: this.output,
      variables: { ...this.variables },
      isWaitingForInput: this.isWaitingForInput,
      completed: this.currentIndex >= this.executionStack.length,
      currentLine: this.currentIndex
    };
  }

  buildExecutionStack(statements) {
    for (const statement of statements) {
      this.executionStack.push(statement);
    }
  }

  executeStep() {
    const statement = this.executionStack[this.currentIndex];
    this.executeStatement(statement);
    
    if (!this.isWaitingForInput) {
      this.currentIndex++;
    }
  }

  executeStatement(node) {
    switch (node.type) {
      case 'Assignment':
        return this.executeAssignment(node);
      case 'Write':
        return this.executeWrite(node);
      case 'Read':
        return this.executeRead(node);
      case 'If':
        return this.executeIf(node);
      case 'While':
        return this.executeWhile(node);
      case 'For':
        return this.executeFor(node);
      default:
        throw new Error(`Type de nœud inconnu: ${node.type}`);
    }
  }

  executeAssignment(node) {
    const value = this.evaluateExpression(node.expression);
    this.variables[node.identifier] = value;
  }

  executeWrite(node) {
    const value = this.evaluateExpression(node.expression);
    this.write(value);
  }

  executeRead(node) {
    if (!this.hasInput()) {
      this.requestInput(node.identifier);
      return;
    }
    
    const value = this.getInput();
    this.variables[node.identifier] = value;
  }

  executeIf(node) {
    const condition = this.evaluateExpression(node.condition);
    
    if (condition) {
      for (const stmt of node.thenBranch) {
        this.executeStatement(stmt);
        if (this.isWaitingForInput) return;
      }
    } else if (node.elseBranch) {
      for (const stmt of node.elseBranch) {
        this.executeStatement(stmt);
        if (this.isWaitingForInput) return;
      }
    }
  }

  executeWhile(node) {
    while (this.evaluateExpression(node.condition)) {
      for (const stmt of node.body) {
        this.executeStatement(stmt);
        if (this.isWaitingForInput) return;
      }
    }
  }

  executeFor(node) {
    const start = this.evaluateExpression(node.start);
    const end = this.evaluateExpression(node.end);
    
    for (let i = start; i <= end; i++) {
      this.variables[node.variable] = i;
      
      for (const stmt of node.body) {
        this.executeStatement(stmt);
        if (this.isWaitingForInput) return;
      }
    }
  }

  evaluateExpression(node) {
    switch (node.type) {
      case 'Number':
        return node.value;
      
      case 'String':
        return node.value;
      
      case 'Identifier':
        if (!(node.name in this.variables)) {
          throw new Error(`Variable non définie: ${node.name} (cette variable doit être initialisée avant utilisation)`);
        }
        return this.variables[node.name];
      
      case 'BinaryOp':
        return this.evaluateBinaryOp(node);
      
      default:
        throw new Error(`Type d'expression inconnu: ${node.type}`);
    }
  }

  evaluateBinaryOp(node) {
    const left = this.evaluateExpression(node.left);
    const right = this.evaluateExpression(node.right);
    
    switch (node.operator) {
      case TokenType.PLUS:
        // Handle string concatenation or numeric addition
        if (typeof left === 'string' || typeof right === 'string') {
          return String(left) + String(right);
        }
        return left + right;
      case TokenType.MINUS:
        return left - right;
      case TokenType.MULTIPLY:
        return left * right;
      case TokenType.DIVIDE:
        if (right === 0) {
          throw new Error('Erreur: Division par zéro détectée');
        }
        return left / right;
      case TokenType.GT:
        return left > right ? 1 : 0;
      case TokenType.LT:
        return left < right ? 1 : 0;
      case TokenType.EQ:
        return left === right ? 1 : 0;
      case TokenType.GTE:
        return left >= right ? 1 : 0;
      case TokenType.LTE:
        return left <= right ? 1 : 0;
      case TokenType.ET:
        return (left && right) ? 1 : 0;
      case TokenType.OU:
        return (left || right) ? 1 : 0;
      default:
        throw new Error(`Opérateur inconnu: ${node.operator}`);
    }
  }

  getState() {
    return {
      variables: { ...this.variables },
      output: [...this.output],
      isWaitingForInput: this.isWaitingForInput,
      completed: this.currentIndex >= this.executionStack.length,
      currentLine: this.currentIndex
    };
  }
}
