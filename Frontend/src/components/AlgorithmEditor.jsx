import React, { useRef, useEffect, useState } from 'react';
import './AlgorithmEditor.css';

function AlgorithmEditor({ code, setCode }) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    // Update line count when code changes
    const lines = code.split('\n').length;
    setLineCount(lines);
  }, [code]);

  const handleScroll = (e) => {
    // Sync line numbers scroll with textarea scroll
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

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
      <div className="editor-container">
        <div className="line-numbers" ref={lineNumbersRef}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="line-number">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          placeholder="Écrivez votre algorithme ici..."
          spellCheck="false"
        />
      </div>
    </div>
  );
}

export default AlgorithmEditor;
