import React from 'react';
import './AlgorithmEditor.css';

function AlgorithmEditor({ code, setCode }) {
  return (
    <div className="algorithm-editor">
      <h2>Éditeur d'algorithme</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Écrivez votre algorithme ici..."
        spellCheck="false"
      />
    </div>
  );
}

export default AlgorithmEditor;
