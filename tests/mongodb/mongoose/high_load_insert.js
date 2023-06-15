const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const mongoose = require('mongoose');

async function insertData() {
  const uri = 'mongodb://localhost:27017/myDatabase'; // URI de connexion à la base de données MongoDB
  const collectionName = 'myCollection'; // Nom de la collection cible
  const numDocuments = 10000; // Nombre de documents à insérer

  try {
    await mongoose.connect(uri);
    const collection = mongoose.connection.collection(collectionName);

    const documents = []; // Tableau pour stocker les documents à insérer

    // Générer les données à insérer
    for (let i = 1; i <= numDocuments; i++) {
      const document = {
        title: `Document ${i}`,
        // Ajouter d'autres champs de données si nécessaire
      };
      documents.push(document);
    }

    // Mesurer le temps de début
    const startTime = new Date().getTime();

    // Insérer les documents dans la collection
    const result = await collection.insertMany(documents);

    // Mesurer le temps de fin
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;

    console.log(`${result.insertedCount} documents insérés en ${executionTime} ms.`);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

// Appeler la fonction pour insérer les données
insertData();
