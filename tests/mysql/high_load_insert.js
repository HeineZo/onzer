const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const mysql = require("mysql");

async function insertData() {
  const connection = mysql.createConnection({
    host: "localhost", // Hôte de la base de données MySQL
    user: "root", // Nom d'utilisateur MySQL
    password: "pDVk8bVm$7r9", // Mot de passe MySQL
    database: "new_schema", // Nom de la base de données MySQL
  });

  const numDocuments = argv.nb; // Nombre de documents à insérer

  try {
    connection.connect();

    const documents = []; // Tableau pour stocker les documents à insérer

    // Générer les données à insérer
    if (!numDocuments) {
      console.error("Veuillez spécifier le nombre de documents à insérer.");
      return;
    }
    for (let i = 1; i <= numDocuments; i++) {
      const document = {
        titre: `Song${i}`,
        artiste: "Artist 1",
        pochetteAlbum: "https://example.com/pochette.jpg",
        duree: 240,
        genre: "rock",
        pays: "France",
        dateSortie: "2022-05-15",
      };
      documents.push(document);
    }

    // Insérer les documents dans la base de données
    // Mesurer le temps de début
    const startTime = new Date().getTime();

    const query = "INSERT INTO musique (titre, artiste, pochetteAlbum, duree, genre, pays, dateSortie) VALUES ?";
    const values = documents.map((document) => [
      document.titre,
      document.artiste,
      document.pochetteAlbum,
      document.duree,
      document.genre,
      document.pays,
      document.dateSortie,
    ]);

    // Insérer les documents dans la base de données
    connection.query(query, [values], (error, results) => {
      if (error) {
        console.error(error);
      } else {
        // Mesurer le temps de fin
        const endTime = new Date().getTime();
        const executionTime = endTime - startTime;
        console.log(`${results.affectedRows} documents insérés.`);
        console.log(`Temps d'exécution: ${executionTime}ms`);
      }
      connection.end();
    });
  } catch (err) {
    console.error(err);
  }
}

// Appeler la fonction pour insérer les données
insertData();
