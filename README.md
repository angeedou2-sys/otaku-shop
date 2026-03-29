# 🇯🇵 AD&M Otaku's — Site Web

Boutique en ligne de figurines, vêtements et accessoires anime au Gabon.

---

## 📁 Structure du projet

```
adm-otaku/
├── index.html          ← Page principale (toutes sections)
├── css/
│   └── style.css       ← Styles personnalisés (FromSoftware Dark x Anime)
├── js/
│   └── main.js         ← JavaScript (interactions, panier, formulaire)
├── images/             ← Dossier pour les images (à remplir)
│   └── logo.png        ← Mettez le logo AD&M Otaku's ici
└── README.md           ← Ce fichier
```

---

## 🖼️ Comment ajouter vos images

1. **Logo** : Renommez le logo en `logo.png` et placez-le dans `images/`
2. **Produits** : Pour chaque carte produit, remplacez le placeholder par :
   ```html
   <img src="images/votre-image.jpg" alt="Nom du produit" />
   ```
   à la place de la div `.product-placeholder`

---

## 🌐 Mise en ligne sur InfinityFree

1. Créez un compte sur [infinityfree.com](https://infinityfree.com)
2. Créez un hébergement gratuit
3. Accédez au File Manager ou FTP
4. Uploadez **tout le dossier `adm-otaku/`** dans le répertoire `htdocs/`
5. Votre site sera accessible via l'URL fournie par InfinityFree

### Paramètres FTP (fournis par InfinityFree) :
- Hôte : fourni dans votre panneau
- Utilisateur : fourni dans votre panneau  
- Mot de passe : votre mot de passe
- Port : 21

---

## ✅ Fonctionnalités incluses

| Fonctionnalité           | Statut |
|--------------------------|--------|
| HTML5 sémantique          | ✅ |
| Bootstrap 5 (responsive) | ✅ |
| CSS personnalisé          | ✅ |
| Carousel Bootstrap        | ✅ |
| Validation de formulaire  | ✅ |
| Interactions JS           | ✅ |
| Manipulation du DOM       | ✅ |
| LocalStorage (panier)     | ✅ |
| LocalStorage (newsletter) | ✅ |
| LocalStorage (thème)      | ✅ |
| Mode sombre / clair       | ✅ |
| Animations                | ✅ |
| Responsive (mobile/tab/desktop) | ✅ |
| Filtres boutique          | ✅ |
| Mini-panier               | ✅ |
| Particles animées         | ✅ |

---

## 📱 Pages / Sections

- **Accueil** → Hero avec CTA WhatsApp
- **Boutique** → Grille produits avec filtres par catégorie
- **Articles en vedette** → Carousel Bootstrap
- **À propos** → Histoire de la boutique + infos livraison/paiement
- **Blog** → 3 articles
- **Newsletter** → Inscription email (LocalStorage)
- **Contact** → Formulaire validé + infos de contact

---

## 💳 Infos de paiement (déjà dans le site)

- **Airtel Money** : +241 074 837 720
- **Nom** : NGUI MEZUI Chancelle
- **WhatsApp** : +241 74 837 720
- **Instagram** : @otaku_gabon

---

## 🎨 Design

Inspiré de l'esthétique sombre et épique des jeux **FromSoftware** (Elden Ring, Dark Souls)
adaptée à l'univers anime/pop culture japonaise :

- Palette : noir profond + or + magenta + cyan
- Typographies : Cinzel Decorative / Cinzel / Raleway / Noto Sans JP
- Effets : particles, grain overlay, grille lumineuse, glows colorés

---

*Fait avec 💜 pour AD&M Otaku's · Libreville, Gabon 🇬🇦*
