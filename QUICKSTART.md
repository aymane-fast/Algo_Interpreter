# 🚀 Guide de Démarrage Rapide

## Installation en 5 minutes

### 1. Backend (Terminal 1)

```bash
cd Backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

✅ Backend prêt sur `http://localhost:8000`

### 2. Frontend (Terminal 2)

```bash
cd Frontend
npm install
copy .env.example .env
npm run dev
```

✅ Frontend prêt sur `http://localhost:3000`

### 3. Ouvrez votre navigateur

Allez sur `http://localhost:3000`

## Premier test

Essayez cet algorithme:

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

1. Cliquez sur **Exécuter**
2. Entrez `10` pour A
3. Entrez `5` pour B
4. Voyez le résultat: `10`

## C'est tout! 🎉

Vous pouvez maintenant:
- Écrire des algorithmes en français
- Les exécuter pas à pas
- Créer un compte pour les sauvegarder
