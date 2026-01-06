# Interpréteur d'Algorithmes - MVP

Plateforme éducative pour l'apprentissage de l'algorithmique en français.

## 🎯 Description

Cette application permet aux étudiants d'écrire, exécuter et déboguer des algorithmes en pseudocode français. L'interpréteur s'exécute entièrement côté client (JavaScript), tandis que le backend Laravel gère l'authentification et la sauvegarde des algorithmes.

## 📋 Fonctionnalités

- ✅ Éditeur d'algorithmes en pseudocode français
- ✅ Exécution complète ou pas à pas
- ✅ Table des variables en temps réel
- ✅ Console de sortie
- ✅ Gestion des entrées utilisateur (Lire)
- ✅ Authentification simple
- ✅ Sauvegarde et chargement des algorithmes

## 🧱 Architecture

```
Algo_interpetar/
├── Backend/          # Laravel API (authentification + persistance)
└── Frontend/         # React + Vite (interpréteur + UI)
```

## 🔧 Technologies

### Backend
- Laravel 11
- Laravel Sanctum (authentification)
- MySQL/SQLite

### Frontend
- React 18
- Vite
- Axios
- Interpréteur JavaScript personnalisé (Lexer, Parser, Interpreter)

## 📝 Syntaxe Supportée

### Mots-clés
- `Début` / `Fin` - Délimiteurs du programme
- `Si` / `Alors` / `Sinon` / `FinSi` - Conditions
- `TantQue` / `FinTantQue` - Boucle while
- `Pour` / `FinPour` - Boucle for
- `Écrire` - Affichage
- `Lire` - Saisie utilisateur

### Opérateurs
- Affectation: `←` (utilisez le bouton "← Insérer flèche")
- Arithmétiques: `+` `-` `*` `/`
- Comparaison: `>` `<` `=` `>=` `<=`
- Logiques: `ET` `OU`
- Concaténation: `+` (pour les chaînes)

### Types de données
- **Nombres** (entiers et décimaux): `42`, `3.14`
- **Chaînes de caractères**: `"Bonjour"`, `'texte'`
- Variables (peuvent contenir nombres ou chaînes)

## 🚀 Installation et Lancement

### Prérequis
- PHP 8.2+
- Composer
- Node.js 18+
- npm

### Backend (Laravel)

1. Naviguez vers le dossier Backend:
```bash
cd Backend
```

2. Installez les dépendances:
```bash
composer install
```

3. Copiez le fichier d'environnement:
```bash
copy .env.example .env
```

4. Générez la clé d'application:
```bash
php artisan key:generate
```

5. Configurez la base de données dans `.env`:
```env
DB_CONNECTION=sqlite
# ou
DB_CONNECTION=mysql
DB_DATABASE=algo_interpreter
DB_USERNAME=root
DB_PASSWORD=
```

6. Exécutez les migrations:
```bash
php artisan migrate
```

7. Lancez le serveur:
```bash
php artisan serve
```

Le backend sera accessible sur `http://localhost:8000`

### Frontend (React)

1. Ouvrez un nouveau terminal et naviguez vers le dossier Frontend:
```bash
cd Frontend
```

2. Installez les dépendances:
```bash
npm install
```

3. Créez le fichier `.env`:
```bash
copy .env.example .env
```

Le fichier `.env` contient:
```env
VITE_API_URL=http://localhost:8000
```

4. Lancez le serveur de développement:
```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

## 📖 Utilisation

### 1. Écrire un algorithme

Exemple simple:
```
Début
  Lire A
  Lire B
  Si A > B Alors
    Écrire A
  Sinon
    Écrire B
  FinSi
Fin
```

### 2. Exécuter

- **Exécuter**: Lance l'algorithme en continu
- **Pas à pas**: Exécute instruction par instruction
- **Réinitialiser**: Remet à zéro l'état

### 3. Entrées utilisateur

Quand l'algorithme rencontre `Lire X`, une popup demande la valeur.

### 4. Sauvegarder

Connectez-vous, donnez un nom à votre algorithme, et sauvegardez-le.

## 📚 Exemples d'algorithmes

### Salutation simple avec concaténation
```
Début
  Lire nom
  Écrire "Bonjour " + nom + " !"
Fin
```

### Maximum de deux nombres
```
Début
  Lire A
  Lire B
  Si A > B Alors
    Écrire "Le maximum est: " + A
  Sinon
    Écrire "Le maximum est: " + B
  FinSi
Fin
```

### Somme de 1 à N
```
Début
  Lire N
  somme ← 0
  Pour i ← 1 <= N
    somme ← somme + i
  FinPour
  Écrire "La somme est: " + somme
Fin
```

### Factorielle
```
Début
  Lire N
  resultat ← 1
  i ← 1
  TantQue i <= N
    resultat ← resultat * i
    i ← i + 1
  FinTantQue
  Écrire resultat
Fin
```

## 🔍 Structure du Code

### Frontend

```
Frontend/
├── src/
│   ├── interpreter/
│   │   ├── lexer.js        # Tokenisation
│   │   ├── parser.js       # Construction AST
│   │   └── interpreter.js  # Moteur d'exécution
│   ├── components/
│   │   ├── AlgorithmEditor.jsx
│   │   ├── Controls.jsx
│   │   ├── VariableTable.jsx
│   │   ├── OutputConsole.jsx
│   │   └── AuthPanel.jsx
│   └── App.jsx
```

### Backend

```
Backend/
├── app/
│   ├── Http/Controllers/
│   │   ├── AuthController.php
│   │   └── AlgorithmController.php
│   └── Models/
│       ├── User.php
│       └── Algorithm.php
├── routes/
│   └── api.php
└── database/migrations/
```

## 🐛 Dépannage

### Erreur CORS
Vérifiez que `config/cors.php` autorise `http://localhost:3000`

### Erreur d'authentification
Assurez-vous que Laravel Sanctum est bien installé:
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Le frontend ne se connecte pas au backend
Vérifiez que le proxy est configuré dans `vite.config.js`

## ⚠️ Limitations (MVP)

Cette version MVP ne supporte PAS:
- ❌ Tableaux
- ❌ Chaînes de caractères
- ❌ Fonctions/Procédures
- ❌ Récursivité
- ❌ Import/Export de fichiers
- ❌ Génération de code
- ❌ Explications IA
- ❌ Diagrammes de flux

## 🚀 Évolutions Futures (Post-MVP)

- Support des tableaux
- Visualisation graphique
- Mode collaboratif
- Bibliothèque d'exercices
- Tests automatiques
- Export PDF

## 📄 Licence

Projet éducatif - Usage libre

## 👤 Auteur

Projet créé dans un cadre éducatif.
