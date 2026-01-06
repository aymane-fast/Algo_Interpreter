# Exemples d'Algorithmes avec Chaînes et Concaténation

## 1. Salutation personnalisée
```
Début
  Lire nom
  Écrire "Bonjour " + nom + " !"
Fin
```

**Entrée:** `Jean`  
**Sortie:** `Bonjour Jean !`

---

## 2. Message avec calcul
```
Début
  Lire age
  ageAnneeProchaine ← age + 1
  Écrire "L'année prochaine vous aurez " + ageAnneeProchaine + " ans"
Fin
```

**Entrée:** `25`  
**Sortie:** `L'année prochaine vous aurez 26 ans`

---

## 3. Comparaison avec messages
```
Début
  Lire note
  Si note >= 10 Alors
    Écrire "Félicitations ! Votre note est " + note
  Sinon
    Écrire "Dommage, votre note est seulement " + note
  FinSi
Fin
```

**Entrée:** `15`  
**Sortie:** `Félicitations ! Votre note est 15`

---

## 4. Compteur avec message
```
Début
  Lire max
  Pour i ← 1 <= max
    Écrire "Itération numéro " + i
  FinPour
  Écrire "Terminé après " + max + " itérations"
Fin
```

**Entrée:** `3`  
**Sortie:**  
```
Itération numéro 1
Itération numéro 2
Itération numéro 3
Terminé après 3 itérations
```

---

## 5. Opérations arithmétiques avec description
```
Début
  Lire a
  Lire b
  somme ← a + b
  produit ← a * b
  Écrire a + " + " + b + " = " + somme
  Écrire a + " × " + b + " = " + produit
Fin
```

**Entrées:** `5`, `3`  
**Sortie:**  
```
5 + 3 = 8
5 × 3 = 15
```

---

## 6. Table de multiplication
```
Début
  Lire n
  Écrire "Table de multiplication de " + n
  Pour i ← 1 <= 10
    resultat ← n * i
    Écrire n + " × " + i + " = " + resultat
  FinPour
Fin
```

**Entrée:** `7`  
**Sortie:**  
```
Table de multiplication de 7
7 × 1 = 7
7 × 2 = 14
7 × 3 = 21
...
7 × 10 = 70
```

---

## Notes importantes

### Utilisation des guillemets
- Guillemets doubles: `"texte"`
- Guillemets simples: `'texte'`
- Les deux fonctionnent de la même manière

### Concaténation avec +
```
"Bonjour" + " " + "monde"  →  "Bonjour monde"
"Age: " + 25               →  "Age: 25"
variable + " ans"          →  valeur de variable + " ans"
```

### Insertion du caractère ←
- Cliquez sur le bouton **"← Insérer flèche"** dans l'éditeur
- Le caractère sera inséré à la position du curseur
- Raccourci alternatif: copiez-collez ←

### Variables mixtes
Les variables peuvent contenir des nombres ou des chaînes:
```
nom ← "Alice"
age ← 25
message ← nom + " a " + age + " ans"
```
