import React from 'react';
import './VariableTable.css';

function VariableTable({ variables }) {
  const varEntries = Object.entries(variables);

  return (
    <div className="variable-table">
      <h2>Table des variables</h2>
      
      {varEntries.length === 0 ? (
        <p className="empty-message">Aucune variable définie</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Valeur</th>
            </tr>
          </thead>
          <tbody>
            {varEntries.map(([name, value]) => (
              <tr key={name}>
                <td className="var-name">{name}</td>
                <td className="var-value">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VariableTable;
