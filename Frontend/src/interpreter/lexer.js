// Token types
export const TokenType = {
  // Keywords
  DEBUT: 'DEBUT',
  FIN: 'FIN',
  SI: 'SI',
  ALORS: 'ALORS',
  SINON: 'SINON',
  FINSI: 'FINSI',
  TANTQUE: 'TANTQUE',
  FINTANTQUE: 'FINTANTQUE',
  POUR: 'POUR',
  FINPOUR: 'FINPOUR',
  ECRIRE: 'ECRIRE',
  LIRE: 'LIRE',
  
  // Operators
  ASSIGN: 'ASSIGN',           // ←
  PLUS: 'PLUS',               // +
  MINUS: 'MINUS',             // -
  MULTIPLY: 'MULTIPLY',       // *
  DIVIDE: 'DIVIDE',           // /
  GT: 'GT',                   // >
  LT: 'LT',                   // <
  EQ: 'EQ',                   // =
  GTE: 'GTE',                 // >=
  LTE: 'LTE',                 // <=
  ET: 'ET',                   // ET
  OU: 'OU',                   // OU
  
  // Literals
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  IDENTIFIER: 'IDENTIFIER',
  
  // Special
  NEWLINE: 'NEWLINE',
  EOF: 'EOF'
};

// Keywords mapping
const KEYWORDS = {
  'Début': TokenType.DEBUT,
  'Fin': TokenType.FIN,
  'Si': TokenType.SI,
  'Alors': TokenType.ALORS,
  'Sinon': TokenType.SINON,
  'FinSi': TokenType.FINSI,
  'TantQue': TokenType.TANTQUE,
  'FinTantQue': TokenType.FINTANTQUE,
  'Pour': TokenType.POUR,
  'FinPour': TokenType.FINPOUR,
  'Écrire': TokenType.ECRIRE,
  'Ecrire': TokenType.ECRIRE,  // Allow without accent
  'Lire': TokenType.LIRE,
  'ET': TokenType.ET,
  'OU': TokenType.OU
};

export class Token {
  constructor(type, value, line, column) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
  }
}

export class Lexer {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.line = 1;
    this.column = 1;
  }

  current() {
    return this.input[this.position];
  }

  peek(offset = 1) {
    return this.input[this.position + offset];
  }

  advance() {
    const char = this.current();
    this.position++;
    if (char === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    return char;
  }

  skipWhitespace() {
    while (this.current() && /[ \t\r]/.test(this.current())) {
      this.advance();
    }
  }

  readNumber() {
    let num = '';
    let hasDecimal = false;
    
    while (this.current() && (/\d/.test(this.current()) || this.current() === '.')) {
      if (this.current() === '.') {
        if (hasDecimal) break;
        hasDecimal = true;
      }
      num += this.current();
      this.advance();
    }
    
    return parseFloat(num);
  }

  readIdentifier() {
    let id = '';
    
    // Allow letters (including accented), digits, and underscores
    while (this.current() && /[a-zA-ZÀ-ÿ0-9_]/.test(this.current())) {
      id += this.current();
      this.advance();
    }
    
    return id;
  }

  readString() {
    let str = '';
    const quote = this.current(); // " or '
    const startLine = this.line; // Remember where the string started
    const startColumn = this.column;
    this.advance(); // Skip opening quote
    
    while (this.current() && this.current() !== quote) {
      if (this.current() === '\\' && this.peek() === quote) {
        // Handle escaped quotes
        this.advance();
        str += this.current();
        this.advance();
      } else {
        str += this.current();
        this.advance();
      }
    }
    
    if (this.current() !== quote) {
      throw new Error(`Chaîne de caractères non fermée à la ligne ${startLine}`);
    }
    
    this.advance(); // Skip closing quote
    return str;
  }

  tokenize() {
    const tokens = [];
    
    while (this.position < this.input.length) {
      this.skipWhitespace();
      
      if (!this.current()) break;
      
      const line = this.line;
      const column = this.column;
      
      // Newlines
      if (this.current() === '\n') {
        tokens.push(new Token(TokenType.NEWLINE, '\n', line, column));
        this.advance();
        continue;
      }
      
      // Numbers
      if (/\d/.test(this.current())) {
        const num = this.readNumber();
        tokens.push(new Token(TokenType.NUMBER, num, line, column));
        continue;
      }
      
      // Assignment operator ←
      if (this.current() === '←') {
        tokens.push(new Token(TokenType.ASSIGN, '←', line, column));
        this.advance();
        continue;
      }
      
      // Comparison operators
      if (this.current() === '>') {
        this.advance();
        if (this.current() === '=') {
          this.advance();
          tokens.push(new Token(TokenType.GTE, '>=', line, column));
        } else {
          tokens.push(new Token(TokenType.GT, '>', line, column));
        }
        continue;
      }
      
      if (this.current() === '<') {
        this.advance();
        if (this.current() === '=') {
          this.advance();
          tokens.push(new Token(TokenType.LTE, '<=', line, column));
        } else {
          tokens.push(new Token(TokenType.LT, '<', line, column));
        }
        continue;
      }
      
      if (this.current() === '=') {
        tokens.push(new Token(TokenType.EQ, '=', line, column));
        this.advance();
        continue;
      }
      
      // Arithmetic operators
      if (this.current() === '+') {
        tokens.push(new Token(TokenType.PLUS, '+', line, column));
        this.advance();
        continue;
      }
      
      if (this.current() === '-') {
        tokens.push(new Token(TokenType.MINUS, '-', line, column));
        this.advance();
        continue;
      }
      
      if (this.current() === '*') {
        tokens.push(new Token(TokenType.MULTIPLY, '*', line, column));
        this.advance();
        continue;
      }
      
      if (this.current() === '/') {
        tokens.push(new Token(TokenType.DIVIDE, '/', line, column));
        this.advance();
        continue;
      }
      
      // String literals
      if (this.current() === '"' || this.current() === "'") {
        const str = this.readString();
        tokens.push(new Token(TokenType.STRING, str, line, column));
        continue;
      }
      
      // Keywords and identifiers
      if (/[a-zA-ZÀ-ÿ]/.test(this.current())) {
        const id = this.readIdentifier();
        const tokenType = KEYWORDS[id] || TokenType.IDENTIFIER;
        tokens.push(new Token(tokenType, id, line, column));
        continue;
      }
      
      // Unknown character - skip it
      this.advance();
    }
    
    tokens.push(new Token(TokenType.EOF, null, this.line, this.column));
    return tokens;
  }
}
