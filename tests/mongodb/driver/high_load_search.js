#!/usr/bin/env node

const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const { ar } = require("date-fns/locale")
const argv = yargs(hideBin(process.argv)).argv
const MongoClient = require("mongodb").MongoClient

async function searchDocuments() {
  const url = "mongodb://127.0.0.01:27017"
  const dbName = "onzer"
  const collectionName = "musiques"

  if (!argv.nb) {
    console.error("Veuillez spécifier le nombre de documents à retourner.")
    return
  }

  try {
    const client = await MongoClient.connect(url)
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    // Mesurer le temps de début
    const startTime = new Date().getTime()

    // Effectuer la recherche limitée
    const result = await collection
      .find({ titre: { $regex: /song/ } }, { limit: argv.nb })
      .toArray()

    // Mesurer le temps de fin
    const endTime = new Date().getTime()
    const executionTime = endTime - startTime

    console.log(`Nombre de documents retournés : ${result.length}`)
    console.log(`Temps d'exécution : ${executionTime} ms`)
    if (result.length < argv.nb) {
      console.log(
        `Le nombre de documents retournés est inférieur au nombre de documents demandés \n
        Veuillez réessayer avec un nombre plus petit ou rajouter des documents dans la collection.`
      )
    }

    client.close()
  } catch (err) {
    console.error(err)
  }
}

// Appeler la fonction pour effectuer la recherche en masse
searchDocuments()
