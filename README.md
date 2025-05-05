
# 🐱 NekoScript

NekoScript est un langage de programmation français simple et créatif, parfait pour les débutants et pour créer des bots Discord !

## 📦 Installation

```bash
npm install nekoscript-coding
```

## 🚀 Démarrage rapide

1. Créer un nouveau projet :
```bash
npx neko-script nouveau monprojet
```

2. Exécuter un fichier .neko :
```bash
npx neko-script executer main.neko
```

## 📝 Syntaxe de base

### Afficher du texte
```
neko = ("Bonjour tout le monde!")
```

### Calculs mathématiques
```
compteneko = 5 plus 3
compteneko = 10 moins 2
compteneko = 4 multiplier 3
compteneko = 8 diviser 2
```

### Boucles
```
boucle(5)
{
  neko = ("Je suis dans une boucle!")
}
```

### Conditions
```
si(vrai)
{
  neko = ("C'est vrai!")
}
```

## 🤖 Création de bot Discord

### Connexion
```
discordNeko.connexion("TON_TOKEN_DISCORD")
```

### Commandes
```
nekoCommande("salut", "Bonjour à toi!")
```

### Réactions
```
nekoReagit("Bonjour", "👋")
```

## 📚 Commandes CLI

- `neko-script nouveau <nom>` : Crée un nouveau projet
- `neko-script executer <fichier>` : Exécute un fichier .neko
- `neko-script installer <package>` : Installe un package NekoScript
- `neko-script publier <nom>` : Publie un package NekoScript

## 🎮 Exemples

Voir le dossier `examples/` pour des exemples complets, notamment `bot.neko` pour un exemple de bot Discord.

## 📄 License

MIT
