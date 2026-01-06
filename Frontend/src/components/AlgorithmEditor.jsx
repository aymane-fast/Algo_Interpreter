import React, { useRef } from 'react';
import './AlgorithmEditor.css';

function AlgorithmEditor({ code, setCode }) {
  const textareaRef = useRef(null);

  const insertArrow = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newCode = code.substring(0, start) + '←' + code.substring(end);
    
    setCode(newCode);
    
    // Set cursor position after the arrow
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  return (
    <div className="algorithm-editor">
      <div className="editor-header">
        <h2>Éditeur d'algorithme</h2>
        <button onClick={insertArrow} className="btn-arrow" title="Insérer ←">
          ← Insérer flèche
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Écrivez votre algorithme ici..."
        spellCheck="false"
      />
    </div>
  );
}

export default AlgorithmEditor;
