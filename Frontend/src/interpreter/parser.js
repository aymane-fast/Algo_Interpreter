import { TokenType } from './lexer.js';

// AST Node types
export class ProgramNode {
  constructor(statements) {
    this.type = 'Program';
    this.statements = statements;
  }
}

export class AssignmentNode {
  constructor(identifier, expression) {
    this.type = 'Assignment';
    this.identifier = identifier;
    this.expression = expression;
  }
}

export class WriteNode {
  constructor(expression) {
    this.type = 'Write';
    this.expression = expression;
  }
}

export class ReadNode {
  constructor(identifier) {
    this.type = 'Read';
    this.identifier = identifier;
  }
}

export class IfNode {
  constructor(condition, thenBranch, elseBranch = null) {
    this.type = 'If';
    this.condition = condition;
    this.thenBranch = thenBranch;
    this.elseBranch = elseBranch;
  }
}

export class WhileNode {
  constructor(condition, body) {
    this.type = 'While';
    this.condition = condition;
    this.body = body;
  }
}

export class ForNode {
  constructor(variable, start, end, body) {
    this.type = 'For';
    this.variable = variable;
    this.start = start;
    this.end = end;
    this.body = body;
  }
}

export class BinaryOpNode {
  constructor(left, operator, right) {
    this.type = 'BinaryOp';
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

export class NumberNode {
  constructor(value) {
    this.type = 'Number';
    this.value = value;
  }
}

export class IdentifierNode {
  constructor(name) {
    this.type = 'Identifier';
    this.name = name;
  }
}

export class Parser {
  constructor(tokens) {
    this.tokens = tokens.filter(t => t.type !== TokenType.NEWLINE); // Remove newlines for easier parsing
    this.position = 0;
  }

  current() {
    return this.tokens[this.position];
  }

  peek(offset = 1) {
    return this.tokens[this.position + offset];
  }

  advance() {
    return this.tokens[this.position++];
  }

  expect(type) {
    const token = this.current();
    if (token.type !== type) {
      throw new Error(`Erreur de syntaxe ligne ${token.line}: attendu ${type}, obtenu ${token.type}`);
    }
    return this.advance();
  }

  parse() {
    this.expect(TokenType.DEBUT);
    const statements = this.parseStatements();
    this.expect(TokenType.FIN);
    return new ProgramNode(statements);
  }

  parseStatements() {
    const statements = [];
    
    while (this.current().type !== TokenType.FIN &&
           this.current().type !== TokenType.FINSI &&
           this.current().type !== TokenType.FINTANTQUE &&
           this.current().type !== TokenType.FINPOUR &&
           this.current().type !== TokenType.SINON &&
           this.current().type !== TokenType.EOF) {
      statements.push(this.parseStatement());
    }
    
    return statements;
  }

  parseStatement() {
    const token = this.current();
    
    switch (token.type) {
      case TokenType.IDENTIFIER:
        return this.parseAssignment();
      case TokenType.ECRIRE:
        return this.parseWrite();
      case TokenType.LIRE:
        return this.parseRead();
      case TokenType.SI:
        return this.parseIf();
      case TokenType.TANTQUE:
        return this.parseWhile();
      case TokenType.POUR:
        return this.parseFor();
      default:
        throw new Error(`Erreur de syntaxe ligne ${token.line}: instruction invalide`);
    }
  }

  parseAssignment() {
    const identifier = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.ASSIGN);
    const expression = this.parseExpression();
    return new AssignmentNode(identifier, expression);
  }

  parseWrite() {
    this.expect(TokenType.ECRIRE);
    const expression = this.parseExpression();
    return new WriteNode(expression);
  }

  parseRead() {
    this.expect(TokenType.LIRE);
    const identifier = this.expect(TokenType.IDENTIFIER).value;
    return new ReadNode(identifier);
  }

  parseIf() {
    this.expect(TokenType.SI);
    const condition = this.parseExpression();
    this.expect(TokenType.ALORS);
    const thenBranch = this.parseStatements();
    
    let elseBranch = null;
    if (this.current().type === TokenType.SINON) {
      this.advance();
      elseBranch = this.parseStatements();
    }
    
    this.expect(TokenType.FINSI);
    return new IfNode(condition, thenBranch, elseBranch);
  }

  parseWhile() {
    this.expect(TokenType.TANTQUE);
    const condition = this.parseExpression();
    const body = this.parseStatements();
    this.expect(TokenType.FINTANTQUE);
    return new WhileNode(condition, body);
  }

  parseFor() {
    this.expect(TokenType.POUR);
    const variable = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.ASSIGN);
    const start = this.parseExpression();
    
    // Expect 'à' or just parse the end expression
    // For simplicity, we'll parse it as: Pour i ← 1 10
    const end = this.parseExpression();
    const body = this.parseStatements();
    this.expect(TokenType.FINPOUR);
    
    return new ForNode(variable, start, end, body);
  }

  parseExpression() {
    return this.parseLogicalOr();
  }

  parseLogicalOr() {
    let left = this.parseLogicalAnd();
    
    while (this.current().type === TokenType.OU) {
      const operator = this.advance().type;
      const right = this.parseLogicalAnd();
      left = new BinaryOpNode(left, operator, right);
    }
    
    return left;
  }

  parseLogicalAnd() {
    let left = this.parseComparison();
    
    while (this.current().type === TokenType.ET) {
      const operator = this.advance().type;
      const right = this.parseComparison();
      left = new BinaryOpNode(left, operator, right);
    }
    
    return left;
  }

  parseComparison() {
    let left = this.parseAdditive();
    
    const compOps = [TokenType.GT, TokenType.LT, TokenType.EQ, TokenType.GTE, TokenType.LTE];
    if (compOps.includes(this.current().type)) {
      const operator = this.advance().type;
      const right = this.parseAdditive();
      left = new BinaryOpNode(left, operator, right);
    }
    
    return left;
  }

  parseAdditive() {
    let left = this.parseMultiplicative();
    
    while ([TokenType.PLUS, TokenType.MINUS].includes(this.current().type)) {
      const operator = this.advance().type;
      const right = this.parseMultiplicative();
      left = new BinaryOpNode(left, operator, right);
    }
    
    return left;
  }

  parseMultiplicative() {
    let left = this.parsePrimary();
    
    while ([TokenType.MULTIPLY, TokenType.DIVIDE].includes(this.current().type)) {
      const operator = this.advance().type;
      const right = this.parsePrimary();
      left = new BinaryOpNode(left, operator, right);
    }
    
    return left;
  }

  parsePrimary() {
    const token = this.current();
    
    if (token.type === TokenType.NUMBER) {
      this.advance();
      return new NumberNode(token.value);
    }
    
    if (token.type === TokenType.IDENTIFIER) {
      this.advance();
      return new IdentifierNode(token.value);
    }
    
    // Handle unary minus
    if (token.type === TokenType.MINUS) {
      this.advance();
      const expr = this.parsePrimary();
      return new BinaryOpNode(new NumberNode(0), TokenType.MINUS, expr);
    }
    
    throw new Error(`Erreur de syntaxe ligne ${token.line}: expression invalide`);
  }
}
