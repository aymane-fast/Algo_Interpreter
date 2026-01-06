import React from 'react';
import './SyntaxReference.css';

function SyntaxReference() {
  return (
    <div className="syntax-reference">
      <h1>📚 Référence de Syntaxe</h1>
      
      <section className="syntax-section">
        <h2>Structure du Programme</h2>
        <div className="syntax-block">
          <h3>Programme de base</h3>
          <pre><code>{`Début
  [instructions]
Fin`}</code></pre>
          <p className="description">
            Tout algorithme doit commencer par <code>Début</code> et se terminer par <code>Fin</code>.
          </p>
        </div>
      </section>

      <section className="syntax-section">
        <h2>Variables et Affectation</h2>
        <div className="syntax-block">
          <h3>Affectation</h3>
          <pre><code>{`variable ← valeur
nom ← "Alice"
age ← 25
resultat ← a + b`}</code></pre>
          <p className="description">
            Utilisez le symbole <code>←</code> pour affecter une valeur à une variable.
            Cliquez sur le bouton "← Insérer flèche" dans l'éditeur.
          </p>
        </div>
      </section>

      <section className="syntax-section">
        <h2>Types de Données</h2>
        <div className="syntax-block">
          <h3>Nombres</h3>
          <pre><code>{`age ← 25
pi ← 3.14
negatif ← -10`}</code></pre>
          <p className="description">Nombres entiers et décimaux.</p>
        </div>

        <div className="syntax-block">
          <h3>Chaînes de caractères</h3>
          <pre><code>{`nom ← "Alice"
message ← 'Bonjour'
texte ← "Il a dit \\"bonjour\\""`}</code></pre>
          <p className="description">
            Utilisez des guillemets doubles <code>"..."</code> ou simples <code>'...'</code>.
          </p>
        </div>
      </section>

      <section className="syntax-section">
        <h2>Entrées/Sorties</h2>
        <div className="syntax-block">
          <h3>Lire (Entrée utilisateur)</h3>
          <pre><code>{`Lire nom
Lire age
Lire nombre`}</code></pre>
          <p className="description">
            Demande une valeur à l'utilisateur et la stocke dans la variable.
          </p>
        </div>

        <div className="syntax-block">
          <h3>Écrire (Sortie)</h3>
          <pre><code>{`Écrire "Bonjour"
Écrire age
Écrire "Résultat: " + resultat`}</code></pre>
          <p className="description">
            Affiche une valeur dans la console de sortie. Accepte aussi <code>Ecrire</code> (sans accent).
          </p>
        </div>
      </section>

      <section className="syntax-section">
        <h2>Opérateurs</h2>
        <div className="syntax-block">
          <h3>Opérateurs Arithmétiques</h3>
          <table className="operators-table">
            <thead>
              <tr>
                <th>Opérateur</th>
                <th>Description</th>
                <th>Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>+</code></td><td>Addition</td><td><code>5 + 3 → 8</code></td></tr>
              <tr><td><code>-</code></td><td>Soustraction</td><td><code>5 - 3 → 2</code></td></tr>
              <tr><td><code>*</code></td><td>Multiplication</td><td><code>5 * 3 → 15</code></td></tr>
              <tr><td><code>/</code></td><td>Division</td><td><code>10 / 2 → 5</code></td></tr>
            </tbody>
          </table>
        </div>

        <div className="syntax-block">
          <h3>Opérateurs de Comparaison</h3>
          <table className="operators-table">
            <thead>
              <tr>
                <th>Opérateur</th>
                <th>Description</th>
                <th>Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>&gt;</code></td><td>Supérieur à</td><td><code>5 &gt; 3 → vrai</code></td></tr>
              <tr><td><code>&lt;</code></td><td>Inférieur à</td><td><code>5 &lt; 3 → faux</code></td></tr>
              <tr><td><code>=</code></td><td>Égal à</td><td><code>5 = 5 → vrai</code></td></tr>
              <tr><td><code>&gt;=</code></td><td>Supérieur ou égal</td><td><code>5 &gt;= 5 → vrai</code></td></tr>
              <tr><td><code>&lt;=</code></td><td>Inférieur ou égal</td><td><code>3 &lt;= 5 → vrai</code></td></tr>
            </tbody>
          </table>
        </div>

        <div className="syntax-block">
          <h3>Opérateurs Logiques</h3>
          <table className="operators-table">
            <thead>
              <tr>
                <th>Opérateur</th>
                <th>Description</th>
                <th>Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>ET</code></td><td>ET logique</td><td><code>A &gt; 5 ET B &lt; 10</code></td></tr>
              <tr><td><code>OU</code></td><td>OU logique</td><td><code>A = 0 OU B = 0</code></td></tr>
            </tbody>
          </table>
        </div>

        <div className="syntax-block">
          <h3>Concaténation de Chaînes</h3>
          <pre><code>{`"Bonjour " + "monde" → "Bonjour monde"
"Age: " + 25 → "Age: 25"
nom + " a " + age + " ans"`}</code></pre>
          <p className="description">
            L'opérateur <code>+</code> concatène les chaînes. Les nombres sont automatiquement convertis.
          </p>
        </div>
      </section>

      <section className="syntax-section">
        <h2>Structures de Contrôle</h2>
        
        <div className="syntax-block">
          <h3>Si...Alors...Sinon...FinSi</h3>
          <pre><code>{`Si condition Alors
  [instructions si vrai]
Sinon
  [instructions si faux]
FinSi`}</code></pre>
          <p className="description">
            La clause <code>Sinon</code> est optionnelle.
          </p>
          <pre><code>{`Si age >= 18 Alors
  Écrire "Majeur"
Sinon
  Écrire "Mineur"
FinSi`}</code></pre>
        </div>

        <div className="syntax-block">
          <h3>TantQue...FinTantQue</h3>
          <pre><code>{`TantQue condition
  [instructions]
FinTantQue`}</code></pre>
          <p className="description">
            Répète les instructions tant que la condition est vraie.
          </p>
          <pre><code>{`i ← 1
TantQue i <= 5
  Écrire i
  i ← i + 1
FinTantQue`}</code></pre>
        </div>

        <div className="syntax-block">
          <h3>Pour...FinPour</h3>
          <pre><code>{`Pour variable ← début opérateur fin
  [instructions]
FinPour`}</code></pre>
          <p className="description">
            Opérateurs possibles: <code>&lt;=</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&gt;</code>
          </p>
          <pre><code>{`Pour i ← 1 <= 10
  Écrire i
FinPour

Pour j ← 10 >= 1
  Écrire j
FinPour`}</code></pre>
        </div>
      </section>

      <section className="syntax-section">
        <h2>Ordre de Priorité des Opérateurs</h2>
        <div className="syntax-block">
          <ol className="priority-list">
            <li>Parenthèses (non supportées en MVP)</li>
            <li>Multiplication <code>*</code> et Division <code>/</code></li>
            <li>Addition <code>+</code> et Soustraction <code>-</code></li>
            <li>Comparaisons <code>&gt;</code>, <code>&lt;</code>, <code>=</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
            <li>ET logique <code>ET</code></li>
            <li>OU logique <code>OU</code></li>
          </ol>
          <pre><code>{`2 + 3 * 4 → 14  (pas 20)
5 > 3 ET 10 < 20 → vrai`}</code></pre>
        </div>
      </section>

      <section className="syntax-section">
        <h2>❌ Non Supporté (MVP)</h2>
        <div className="syntax-block">
          <ul className="not-supported-list">
            <li>❌ Tableaux</li>
            <li>❌ Fonctions et procédures</li>
            <li>❌ Parenthèses dans les expressions</li>
            <li>❌ Opérateur NON</li>
            <li>❌ Opérateur modulo</li>
            <li>❌ Boucle Répéter...Jusqu'à</li>
            <li>❌ Commentaires</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default SyntaxReference;
