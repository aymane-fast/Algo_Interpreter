import React from 'react';
import './OutputConsole.css';

function OutputConsole({ output, error }) {
  return (
    <div className="output-console">
      <h2>Console de sortie</h2>
      
      {error && (
        <div className="error">
          <strong>Erreur:</strong> {error}
        </div>
      )}
      
      <div className="console-content">
        {output.length === 0 && !error ? (
          <p className="empty-message">Aucune sortie</p>
        ) : (
          output.map((line, index) => (
            <div key={index} className="output-line">
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OutputConsole;
