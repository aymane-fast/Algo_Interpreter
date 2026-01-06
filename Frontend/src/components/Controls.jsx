import React, { useState } from 'react';
import './Controls.css';

function Controls({ onRun, onStep, onReset, isRunning, isWaitingInput, inputVariable, onInputSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onInputSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="controls">
      <h2>Contrôles</h2>
      
      <div className="button-group">
        <button 
          onClick={onRun} 
          disabled={isRunning || isWaitingInput}
          className="btn-run"
        >
          ▶ Exécuter
        </button>
        
        <button 
          onClick={onStep}
          disabled={isWaitingInput}
          className="btn-step"
        >
          ⏭ Pas à pas
        </button>
        
        <button 
          onClick={onReset}
          className="btn-reset"
        >
          🔄 Réinitialiser
        </button>
      </div>

      {isWaitingInput && (
        <form onSubmit={handleInputSubmit} className="input-form">
          <label>
            Entrez la valeur pour <strong>{inputVariable}</strong>:
          </label>
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Entrez un nombre ou du texte"
              autoFocus
            />
            <button type="submit" className="btn-submit">
              Valider
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Controls;
