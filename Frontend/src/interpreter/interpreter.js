import { TokenType } from './lexer.js';

export class Interpreter {
  constructor() {
    this.variables = {};
    this.output = [];
    this.inputQueue = [];
    this.inputHistory = []; // Store all inputs received
    this.inputConsumed = 0; // Track how many historical inputs we've replayed
    this.inputCallback = null;
    this.isWaitingForInput = false;
    this.ast = null;
    this.statementIndex = 0;
  }

  reset() {
    this.variables = {};
    this.output = [];
    this.inputQueue = [];
    this.inputHistory = [];
    this.inputConsumed = 0;
    this.isWaitingForInput = false;
    this.ast = null;
    this.statementIndex = 0;
  }

  setInputCallback(callback) {
    this.inputCallback = callback;
  }

  provideInput(value) {
    // Try to parse as number, otherwise keep as string
    const num = parseFloat(value);
    const finalValue = isNaN(num) ? value : num;
    this.inputHistory.push(finalValue); // Store in history
    this.inputQueue.push(finalValue); // Also add to queue for immediate consumption
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

  // Execute the entire program - runs until completion or input needed
  execute(ast) {
    if (ast) {
      this.reset();
      this.ast = ast;
    }
    
    if (!this.ast) {
      throw new Error('No program to execute');
    }
    
    // Reset execution state to replay from scratch
    this.variables = {};
    this.output = [];
    this.inputConsumed = 0;
    this.isWaitingForInput = false;
    
    // Execute all statements until we need input or complete
    this.executeStatements(this.ast.statements);
    
    return {
      output: this.output,
      variables: { ...this.variables },
      isWaitingForInput: this.isWaitingForInput,
      completed: !this.isWaitingForInput
    };
  }

  // Execute one step at a time  
  step(ast = null) {
    if (ast && !this.ast) {
      this.reset();
      this.ast = ast;
    }

    if (this.isWaitingForInput) {
      throw new Error("En attente d'une entrée utilisateur");
    }

    if (!this.ast || this.statementIndex >= this.ast.statements.length) {
      return {
        output: this.output,
        variables: { ...this.variables },
        isWaitingForInput: false,
        completed: true
      };
    }

    // Execute one statement
    const statement = this.ast.statements[this.statementIndex];
    this.executeStatement(statement);
    
    if (!this.isWaitingForInput) {
      this.statementIndex++;
    }

    return {
      output: this.output,
      variables: { ...this.variables },
      isWaitingForInput: this.isWaitingForInput,
      completed: this.statementIndex >= this.ast.statements.length && !this.isWaitingForInput,
      currentLine: this.statementIndex
    };
  }

  // Execute a list of statements - stops when input is needed
  executeStatements(statements) {
    for (const statement of statements) {
      this.executeStatement(statement);
      if (this.isWaitingForInput) {
        return; // Pause execution
      }
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
    // Check if we have a historical input to replay
    if (this.inputConsumed < this.inputHistory.length) {
      const value = this.inputHistory[this.inputConsumed];
      this.inputConsumed++;
      this.variables[node.identifier] = value;
      return;
    }
    
    // If we don't have input, request it and pause execution
    if (!this.hasInput()) {
      this.requestInput(node.identifier);
      return;
    }
    
    // We have new input in the queue, use it
    const value = this.getInput();
    this.variables[node.identifier] = value;
  }

  executeIf(node) {
    const condition = this.evaluateExpression(node.condition);
    
    if (condition) {
      this.executeStatements(node.thenBranch);
    } else if (node.elseBranch) {
      this.executeStatements(node.elseBranch);
    }
  }

  executeWhile(node) {
    while (this.evaluateExpression(node.condition)) {
      this.executeStatements(node.body);
      if (this.isWaitingForInput) {
        return; // Pause if waiting for input
      }
    }
  }

  executeFor(node) {
    const start = this.evaluateExpression(node.start);
    const end = this.evaluateExpression(node.end);
    
    for (let i = start; i <= end; i++) {
      this.variables[node.variable] = i;
      this.executeStatements(node.body);
      if (this.isWaitingForInput) {
        return; // Pause if waiting for input
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
      completed: this.ast && this.statementIndex >= this.ast.statements.length && !this.isWaitingForInput
    };
  }
}
