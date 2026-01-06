import React, { useState } from 'react';
import './Examples.css';

function Examples() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const examples = [
    {
      title: "Salutation Simple",
      description: "Demande le nom de l'utilisateur et affiche un message de bienvenue.",
      code: `Début
  Lire nom
  Écrire "Bonjour " + nom + " !"
Fin`,
      input: "Alice",
      output: "Bonjour Alice !"
    },
    {
      title: "Calcul d'Âge Futur",
      description: "Calcule l'âge de l'utilisateur l'année prochaine.",
      code: `Début
  Lire age
  ageProchain ← age + 1
  Écrire "L'année prochaine vous aurez " + ageProchain + " ans"
Fin`,
      input: "25",
      output: "L'année prochaine vous aurez 26 ans"
    },
    {
      title: "Maximum de Deux Nombres",
      description: "Compare deux nombres et affiche le plus grand.",
      code: `Début
  Lire A
  Lire B
  Si A > B Alors
    Écrire "Le maximum est: " + A
  Sinon
    Écrire "Le maximum est: " + B
  FinSi
Fin`,
      input: "10, 5",
      output: "Le maximum est: 10"
    },
    {
      title: "Nombre Pair ou Impair",
      description: "Détermine si un nombre est pair ou impair.",
      code: `Début
  Lire n
  reste ← n - (n / 2) * 2
  Si reste = 0 Alors
    Écrire n + " est pair"
  Sinon
    Écrire n + " est impair"
  FinSi
Fin`,
      input: "7",
      output: "7 est impair"
    },
    {
      title: "Somme de 1 à N",
      description: "Calcule la somme des nombres de 1 à N.",
      code: `Début
  Lire N
  somme ← 0
  Pour i ← 1 <= N
    somme ← somme + i
  FinPour
  Écrire "La somme de 1 à " + N + " est: " + somme
Fin`,
      input: "5",
      output: "La somme de 1 à 5 est: 15"
    },
    {
      title: "Table de Multiplication",
      description: "Affiche la table de multiplication d'un nombre.",
      code: `Début
  Lire n
  Écrire "Table de multiplication de " + n
  Pour i ← 1 <= 10
    resultat ← n * i
    Écrire n + " × " + i + " = " + resultat
  FinPour
Fin`,
      input: "7",
      output: "Table de multiplication de 7\n7 × 1 = 7\n7 × 2 = 14\n..."
    },
    {
      title: "Compte à Rebours",
      description: "Compte à rebours à partir d'un nombre donné.",
      code: `Début
  Lire debut
  Écrire "Compte à rebours:"
  i ← debut
  TantQue i >= 0
    Écrire i
    i ← i - 1
  FinTantQue
  Écrire "Décollage!"
Fin`,
      input: "5",
      output: "Compte à rebours:\n5\n4\n3\n2\n1\n0\nDécollage!"
    },
    {
      title: "Calcul de Factorielle",
      description: "Calcule la factorielle d'un nombre.",
      code: `Début
  Lire n
  resultat ← 1
  i ← 1
  TantQue i <= n
    resultat ← resultat * i
    i ← i + 1
  FinTantQue
  Écrire "Factorielle de " + n + " = " + resultat
Fin`,
      input: "5",
      output: "Factorielle de 5 = 120"
    },
    {
      title: "Moyenne de Trois Notes",
      description: "Calcule la moyenne de trois notes et détermine si l'élève a réussi.",
      code: `Début
  Lire note1
  Lire note2
  Lire note3
  moyenne ← (note1 + note2 + note3) / 3
  Écrire "Moyenne: " + moyenne
  Si moyenne >= 10 Alors
    Écrire "Admis ✓"
  Sinon
    Écrire "Recalé ✗"
  FinSi
Fin`,
      input: "12, 14, 11",
      output: "Moyenne: 12.33...\nAdmis ✓"
    },
    {
      title: "Conversion Température",
      description: "Convertit des degrés Celsius en Fahrenheit.",
      code: `Début
  Lire celsius
  fahrenheit ← celsius * 9 / 5 + 32
  Écrire celsius + "°C = " + fahrenheit + "°F"
Fin`,
      input: "25",
      output: "25°C = 77°F"
    },
    {
      title: "Calcul de Prix avec Réduction",
      description: "Applique une réduction si le montant dépasse un seuil.",
      code: `Début
  Lire prix
  Si prix > 100 Alors
    reduction ← prix * 10 / 100
    prixFinal ← prix - reduction
    Écrire "Prix initial: " + prix
    Écrire "Réduction de 10%: -" + reduction
    Écrire "Prix final: " + prixFinal
  Sinon
    Écrire "Prix: " + prix
    Écrire "Pas de réduction"
  FinSi
Fin`,
      input: "150",
      output: "Prix initial: 150\nRéduction de 10%: -15\nPrix final: 135"
    },
    {
      title: "Puissance d'un Nombre",
      description: "Calcule n élevé à la puissance p.",
      code: `Début
  Lire n
  Lire p
  resultat ← 1
  Pour i ← 1 <= p
    resultat ← resultat * n
  FinPour
  Écrire n + " ^ " + p + " = " + resultat
Fin`,
      input: "2, 8",
      output: "2 ^ 8 = 256"
    }
  ];

  const copyToClipboard = (code, index) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="examples-page">
      <h1>💡 Exemples d'Algorithmes</h1>
      <p className="intro">
        Collection d'algorithmes prêts à l'emploi. Cliquez sur "Copier" pour utiliser un exemple dans l'éditeur.
      </p>

      <div className="examples-grid">
        {examples.map((example, index) => (
          <div key={index} className="example-card">
            <div className="example-header">
              <h3>{example.title}</h3>
              <button 
                className={`btn-copy ${copiedIndex === index ? 'copied' : ''}`}
                onClick={() => copyToClipboard(example.code, index)}
              >
                {copiedIndex === index ? '✓ Copié' : '📋 Copier'}
              </button>
            </div>
            <p className="example-description">{example.description}</p>
            
            <div className="example-code">
              <pre><code>{example.code}</code></pre>
            </div>

            <div className="example-io">
              <div className="io-section">
                <strong>Entrée:</strong>
                <span className="io-value">{example.input}</span>
              </div>
              <div className="io-section">
                <strong>Sortie:</strong>
                <pre className="io-value">{example.output}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Examples;
