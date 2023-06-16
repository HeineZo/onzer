const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const argv = yargs(hideBin(process.argv)).argv
const MongoClient = require("mongodb").MongoClient

async function updateData() {
  const url = "mongodb://127.0.0.1:27017" // URL de connexion à la base de données MongoDB
  const dbName = "onzer" // Nom de la base de données cible
  const collectionName = "musiques" // Nom de la collection cible

  try {
    const client = await MongoClient.connect(url)
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const startTime = new Date().getTime()

    // Modifier les documents dans la collection
    const result = await collection.updateMany(
      { titre: { $regex: `${argv.title || "Song"}` } },
      {
        $set: {
          titre: "Updated song",
          duree: 300,
          pays: "Royaume-Uni",
          dateSortie: new Date("2021-05-15T00:00:00Z"),
        },
      }
    )

    // Mesurer le temps de fin
    const endTime = new Date().getTime()
    const executionTime = endTime - startTime
    console.log(`${result.modifiedCount} documents modifiés.`)
    console.log(`Temps d'exécution: ${executionTime}ms`)

    client.close()
  } catch (err) {
    console.error(err)
  }
}

// Appeler la fonction pour effectuer la modification
updateData()
