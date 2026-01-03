# Frontend - Interpréteur d'Algorithmes

Interface utilisateur React pour l'interpréteur d'algorithmes en pseudocode français.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvre l'application sur `http://localhost:3000`

## Build

```bash
npm run build
```

## Architecture de l'Interpréteur

### Lexer (lexer.js)
Transforme le code source en tokens:
- Identifie les mots-clés (Début, Si, Pour, etc.)
- Reconnaît les opérateurs (←, +, >, etc.)
- Extrait les nombres et identifiants

### Parser (parser.js)
Construit un arbre syntaxique abstrait (AST):
- Analyse la structure du programme
- Gère la précédence des opérateurs
- Vérifie la syntaxe

### Interpreter (interpreter.js)
Exécute l'AST:
- Maintient la table des variables
- Supporte l'exécution pas à pas
- Gère les entrées/sorties

## Composants React

- **AlgorithmEditor**: Éditeur de code
- **Controls**: Boutons d'exécution + gestion des entrées
- **VariableTable**: Affichage des variables
- **OutputConsole**: Console de sortie
- **AuthPanel**: Authentification et sauvegarde
