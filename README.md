<h1 align="center">
    <br>
    <a>
        <img src="/public/icon.svg" alt="Logo" width="200">
    </a>
    <br><br>
    Onzer
</h1>

<h4 align="center">Plateforme musicale factice qui permet de répertorier des musiques et des playlists</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Non%20maintenu-f77f00" alt="Maintenance">
</p>

<p align="center">
  <a href="#✨-roadmap">Roadmap</a> •
  <a href="#🛠️-participer-au-développement">Participer</a> •
  <a href="#🕹️-technologies-utilisées">Technologies</a> •
  <a href="#👋-me-contacter">Contact</a> •
  <a href="#🤠-crédits">Crédit</a> •
  <a href="#©-licence">Licence</a> •
</p>

![Screenshot de l'application](/public/onzer.png)

> **NOTE:** Ce projet a été réalisé dans le cadre d'un projet au BUT Informatique de Vannes

## ✨ Roadmap

- [x]  Faire la connexion entre MongoDB et NextJS  ✅
- [x]  Créer des données de base pour les musiques ✅
- [x]  Créer des données de base pour les playlists ✅
- [x]  Lister toutes les musiques de la base de données ✅
- [x]  Récupérer les données d'une musique ✅
- [x]  Ajouter une musique ✅
- [x]  Modifier une musique ✅
- [x]  Supprimer une musique ✅
- [x]  Lister toutes les playlists ✅
- [x]  Récupérer les données d'une playlist ✅
- [x]  Ajouter une musique à une playlist ✅
- [x]  Créer une playlist ✅
- [x]  Modifier une playlist ✅
- [x]  Supprimer une playlist ✅
- [x]  Récupérer l'image d'une musique automatiquement en fonction de son titre ✅
- [x]  Rechercher une musique ou une playlist à partir de critères ✅

## 🛠️ Participer au développement

### Dépendances

Pour clôner le projet et lancer l'application, vous aurez besoin d'installer [Git](https://git-scm.com) et [Node.js](https://nodejs.org/en/download/) (qui installe [npm](http://npmjs.com)). Depuis votre terminal:

```bash
# Clôner le projet
$ git clone https://github.com/heinezo/onzer

# Se déplacer dans le projet
$ cd onzer

# Installer les dépendances
$ npm install
```

### Base de données

Vous avez le choix, soit vous installez MongoDB pour avoir la base de donnée en local, soit vous utilisez le service cloud proposé par MongoDB.

#### 💻 En local
Installez et lancez MongoDB en local ([Lien](https://www.mongodb.com/try/download/community)).<br>
Le serveur devrait tourné sur le port `27017`

#### ☁️ Avec le cloud
- Créez un compte [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) 
- Une fois sur l'interface d'Atlas, cliquez sur le bouton `Database`
- Dans la section **Database Deployments**, appuyez sur `Connect` sur la base de donnée que vous souhaitez utiliser
- Choisissez le mode de connection standard et créez un utilisateur
- À l'étape **Choose a connection method**, cliquez sur `Connect your application`
- Remplacez `<password>` par le mot de passe que vous aviez choisi pour votre utilisateur et `<myFirstDatabase>` par **onzer**
  
> Vous n'avez plus qu'à récupérer votre lien de connexion à la base qui devrait ressembler à ça avec des valeurs différentes:
> `mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]` 

Enfin, changez le lien de connexion de la base de donnée dans le fichier **index.js** situé à cette adresse: `/lib/mongo/index.js`

### Utilisation
> L'interface de l'application sera disponible à l'addresse [http://localhost:3000](http://localhost:3000)

Si vous souhaitez développer l'application et voir vos changements en temps réels
```bash
  npm run dev
```

Si vous souhaitez voir l'application entièrement compilée
```bash
  npm run preview
```

## 🕹️ Technologies utilisées

<img src="https://skillicons.dev/icons?i=react,tailwind,nextjs,mongodb" alt="Les technologies utilisées" />

## 👋 Me contacter

<a href="https://discordapp.com/users/enzolefrigo" target="_blank">
    <img src="https://skillicons.dev/icons?i=discord" alt="Contactez moi!">
</a>

## 🤠 Crédits

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/HeineZo">
                <img src="https://avatars.githubusercontent.com/u/85509892?v=4" width="100px;" alt="Image de profil" style="border-radius: 100%"/>
                <br />
                <sub><b>Enzo</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/elucas0">
                <img src="https://avatars.githubusercontent.com/u/78381830?v=4" width="100px;" alt="Image de profil" style="border-radius: 100%"/>
                <br />
                <sub><b>Elouann</b></sub>
            </a>
        </td>
    </tr>
</table>

## © Licence

[MIT](LICENSE)
