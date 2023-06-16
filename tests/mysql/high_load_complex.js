const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const argv = yargs(hideBin(process.argv)).argv
const mysql = require("mysql")

async function searchDocuments() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pDVk8bVm$7r9",
    database: "new_schema",
  })

  if (!argv.nb) {
    console.error("Veuillez spécifier le nombre de documents à retourner.")
    return
  }

  const query = `
    SELECT m.titre AS nom, COUNT(pm.musique_id) AS popularite
    FROM musique m
    LEFT JOIN playlist_musique pm ON m.id = pm.musique_id
    LEFT JOIN playlist p ON pm.playlist_id = p.id
    GROUP BY m.id
    ORDER BY popularite DESC
    LIMIT ${argv.nb}
  `
  const startTime = new Date().getTime()

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error)
      connection.end()
      return
    }

    const endTime = new Date().getTime()
    const executionTime = endTime - startTime
    console.log(results)

    console.log(`Nombre de documents retournés : ${results.length}`)
    console.log(`Temps d'exécution : ${executionTime} ms`)
    if (results.length < argv.nb) {
      console.log(
        `Le nombre de documents retournés est inférieur au nombre 
        de documents demandés.\nVeuillez réessayer avec un nombre 
        plus petit ou ajouter des documents dans la collection.`
      )
    }

    connection.end()
  })
}

// Appeler la fonction pour effectuer la recherche en masse
searchDocuments()
