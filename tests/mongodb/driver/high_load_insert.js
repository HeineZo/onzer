#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const MongoClient = require("mongodb").MongoClient

async function insertData() {
  const url = "mongodb://127.0.0.1:27017" // URL de connexion à la base de données MongoDB
  const dbName = "onzer" // Nom de la base de données cible
  const collectionName = "musiques" // Nom de la collection cible
  const numDocuments = argv.nb // Nombre de documents à insérer

  try {
    const client = await MongoClient.connect(url)
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const documents = [] // Tableau pour stocker les documents à insérer

    // Générer les données à insérer
    if (!numDocuments) {
      console.error("Veuillez spécifier le nombre de documents à insérer.")
      return
    }
    for (let i = 1; i <= numDocuments; i++) {
      const document = {
        titre: `${argv.title || "Song"} ${i}`,
        artistes: ["Artist 1"],
        pochetteAlbum: "https://example.com/pochette.jpg",
        duree: 240,
        genres: ["rock"],
        pays: "France",
        dateSortie: new Date("2022-05-15T00:00:00Z"),
      }
      documents.push(document)
    }

    // Insérer les documents dans la collection
    // Mesurer le temps de début
    const startTime = new Date().getTime()

    // Insérer les documents dans la collection
    const result = await collection.insertMany(documents)

    // Mesurer le temps de fin
    const endTime = new Date().getTime()
    const executionTime = endTime - startTime
    console.log(`${result.insertedCount} documents insérés.`)
    console.log(`Temps d'exécution: ${executionTime}ms`)

    client.close()
  } catch (err) {
    console.error(err)
  }
}

// Appeler la fonction pour insérer les données
insertData()
