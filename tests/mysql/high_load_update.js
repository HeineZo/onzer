#!/usr/bin/env node

const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const argv = yargs(hideBin(process.argv)).argv
const mysql = require("mysql")

async function updateData() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pDVk8bVm$7r9",
    database: "new_schema",
  })

  const tableName = "musique"
  const numRecords = argv.nb // Nombre d'enregistrements à mettre à jour

  if (!numRecords) {
    console.error(
      "Veuillez spécifier le nombre d'enregistrements à mettre à jour."
    )
    return
  }

  try {
    connection.connect()

    // Mesurer le temps de début
    const startTime = new Date().getTime()

    // Mettre à jour les enregistrements dans la table
    const query = `UPDATE ${tableName} SET pays = 'Belgique' WHERE pays = 'France' LIMIT ${numRecords}`
    const result = await executeQuery(query, connection)

    // Mesurer le temps de fin
    const endTime = new Date().getTime()
    const executionTime = endTime - startTime

    console.log(`${result.affectedRows} enregistrements mis à jour.`)
    console.log(`Temps d'exécution: ${executionTime}ms`)

    connection.end()
  } catch (err) {
    console.error(err)
  }
}

function executeQuery(query, connection) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

// Appeler la fonction pour mettre à jour les enregistrements en masse
updateData()
