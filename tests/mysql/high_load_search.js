const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const argv = yargs(hideBin(process.argv)).argv
const mysql = require("mysql")

async function searchDocuments() {
  const connection = mysql.createConnection({
    host: "localhost", // Hôte de la base de données MySQL
    user: "root", // Nom d'utilisateur MySQL
    password: "pDVk8bVm$7r9", // Mot de passe MySQL
    database: "new_schema", // Nom de la base de données MySQL
  })


  if (!argv.nb) {
    console.error("Veuillez spécifier le nombre de documents à retourner.")
    return
  }

  connection.connect((err) => {
    if (err) {
      console.error("Erreur de connexion à la base de données : ", err)
      return
    }

    const query = `
      SELECT *
      FROM musique
      WHERE titre LIKE '%song%'
      LIMIT ?
    `
    const startTime = new Date().getTime()

    connection.query(query, [argv.nb], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'exécution de la requête : ", err)
        connection.end()
        return
      }

      const endTime = new Date().getTime()
      const executionTime = endTime - startTime

      console.log(`Nombre de documents retournés : ${result.length}`)
      console.log(`Temps d'exécution : ${executionTime} ms`)
      if (result.length < argv.nb) {
        console.log(
          `Le nombre de documents retournés est inférieur au nombre de documents demandés.\nVeuillez réessayer avec un nombre plus petit ou ajouter des documents dans la collection.`
        )
      }

      connection.end()
    })
  })
}

searchDocuments()
