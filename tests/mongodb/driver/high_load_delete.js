#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const MongoClient = require("mongodb").MongoClient;

async function deleteDocuments() {
  const url = "mongodb://127.0.0.1:27017";
  const dbName = "myDatabase";
  const collectionName = "myCollection";
  const numDocuments = argv.nb; // Nombre de documents à supprimer

  if (!numDocuments) {
    console.error("Veuillez spécifier le nombre de documents à supprimer.");
    return;
  }

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Mesurer le temps de début
    const startTime = new Date().getTime();

    // Supprimer les documents de la collection
    const result = await collection.deleteMany({});

    // Mesurer le temps de fin
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;

    console.log(`${result.deletedCount} documents supprimés.`);
    console.log(`Temps d'exécution: ${executionTime}ms`);

    client.close();
  } catch (err) {
    console.error(err);
  }
}

// Appeler la fonction pour supprimer les documents en masse
deleteDocuments();
