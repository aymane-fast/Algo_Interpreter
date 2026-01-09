import React, { useState, useEffect } from 'react';
import { Lexer } from './interpreter/lexer';
import { Parser } from './interpreter/parser';
import { Interpreter } from './interpreter/interpreter';
import AlgorithmEditor from './components/AlgorithmEditor';
import Controls from './components/Controls';
import VariableTable from './components/VariableTable';
import OutputConsole from './components/OutputConsole';
import AuthPanel from './components/AuthPanel';
import SyntaxReference from './components/SyntaxReference';
import Examples from './components/Examples';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('editor');
  const [code, setCode] = useState(`Début
  Lire nom
  Écrire "Bonjour " + nom
Fin`);
  
  const [interpreter] = useState(() => new Interpreter());
  const [variables, setVariables] = useState({});
  const [output, setOutput] = useState([]);
  const [error, setError] = useState('');
  const [errorLine, setErrorLine] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputVariable, setInputVariable] = useState('');
  const [user, setUser] = useState(null);
  const [savedAlgorithms, setSavedAlgorithms] = useState([]);

  useEffect(() => {
    interpreter.setInputCallback((varName) => {
      setInputVariable(varName);
      setIsWaitingInput(true);
    });
  }, [interpreter]);

  const handleRun = () => {
    try {
      setError('');
      setErrorLine(null);
      setIsRunning(true);
      
      const lexer = new Lexer(code);
      const tokens = lexer.tokenize();
      
      const parser = new Parser(tokens);
      const ast = parser.parse();
      
      const result = interpreter.execute(ast);
      setVariables(result.variables);
      setOutput(result.output);
      setIsWaitingInput(result.isWaitingForInput);
      
      if (!result.isWaitingForInput && result.completed) {
        setIsRunning(false);
      }
    } catch (err) {
      setError(err.message);
      const lineMatch = err.message.match(/ligne (\d+)/);
      if (lineMatch) {
        setErrorLine(parseInt(lineMatch[1]));
      }
      setIsRunning(false);
    }
  };

  const handleStep = () => {
    try {
      setError('');
      setErrorLine(null);
      
      if (!isRunning) {
        const lexer = new Lexer(code);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        
        const result = interpreter.step(ast);
        setVariables(result.variables);
        setOutput(result.output);
        setIsWaitingInput(result.isWaitingForInput);
        setIsRunning(true);
        
        if (result.completed && !result.isWaitingForInput) {
          setIsRunning(false);
        }
      } else {
        const result = interpreter.step();
        setVariables(result.variables);
        setOutput(result.output);
        setIsWaitingInput(result.isWaitingForInput);
        
        if (result.completed && !result.isWaitingForInput) {
          setIsRunning(false);
        }
      }
    } catch (err) {
      setError(err.message);
      const lineMatch = err.message.match(/ligne (\d+)/);
      if (lineMatch) {
        setErrorLine(parseInt(lineMatch[1]));
      }
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    interpreter.reset();
    setVariables({});
    setOutput([]);
    setError('');
    setErrorLine(null);
    setIsRunning(false);
    setIsWaitingInput(false);
    setInputVariable('');
  };

  const handleInputSubmit = (value) => {
    try {
      interpreter.provideInput(value);
      setIsWaitingInput(false);
      setInputVariable('');
      
      // Continue execution after input
      if (isRunning) {
        const result = interpreter.step();
        setVariables(result.variables);
        setOutput(result.output);
        setIsWaitingInput(result.isWaitingForInput);
        
        if (result.completed && !result.isWaitingForInput) {
          setIsRunning(false);
        }
      }
    } catch (err) {
      setError(err.message);
      const lineMatch = err.message.match(/ligne (\d+)/);
      if (lineMatch) {
        setErrorLine(parseInt(lineMatch[1]));
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Interpréteur d'Algorithmes</h1>
        <p>Plateforme éducative pour le pseudocode algorithmique français</p>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-btn ${currentPage === 'editor' ? 'active' : ''}`}
          onClick={() => setCurrentPage('editor')}
        >
          ⚙️ Éditeur
        </button>
        <button 
          className={`nav-btn ${currentPage === 'syntax' ? 'active' : ''}`}
          onClick={() => setCurrentPage('syntax')}
        >
          📚 Syntaxe
        </button>
        <button 
          className={`nav-btn ${currentPage === 'examples' ? 'active' : ''}`}
          onClick={() => setCurrentPage('examples')}
        >
          💡 Exemples
        </button>
      </nav>

      {currentPage === 'editor' && (
        <>
          <AuthPanel 
            user={user}
            setUser={setUser}
            savedAlgorithms={savedAlgorithms}
            setSavedAlgorithms={setSavedAlgorithms}
            code={code}
            setCode={setCode}
          />

          <div className="main-content">
            <div className="left-panel">
              <AlgorithmEditor code={code} setCode={setCode} errorLine={errorLine} />
              <Controls 
                onRun={handleRun}
                onStep={handleStep}
                onReset={handleReset}
                isRunning={isRunning}
                isWaitingInput={isWaitingInput}
                inputVariable={inputVariable}
                onInputSubmit={handleInputSubmit}
              />
            </div>

            <div className="right-panel">
              <VariableTable variables={variables} />
              <OutputConsole output={output} error={error} />
            </div>
          </div>

          <footer className="app-footer">
            <p>Syntaxe supportée: Début/Fin, Si/Sinon/FinSi, TantQue/FinTantQue, Pour/FinPour, Lire, Écrire</p>
            <p>Types: Nombres et chaînes de caractères (entre guillemets) • Concaténation avec +</p>
          </footer>
        </>
      )}

      {currentPage === 'syntax' && <SyntaxReference />}
      
      {currentPage === 'examples' && <Examples />}
    </div>
  );
}

export default App;
