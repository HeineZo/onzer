#!/usr/bin/env node

const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const argv = yargs(hideBin(process.argv)).argv
const MongoClient = require("mongodb").MongoClient

async function searchDocuments() {
  const url = "mongodb://127.0.0.1:27017"
  const dbName = "onzer"

  try {
    const client = await MongoClient.connect(url)
    const db = client.db(dbName)

    const aggregationPipeline = [
      {
        $lookup: {
          from: "playlists",
          localField: "_id",
          foreignField: "musiques",
          as: "playlists",
        },
      },
      {
        $addFields: {
          popularite: { $size: "$playlists" },
        },
      },
      {
        $project: {
          _id: 0,
          nom: "$titre",
          popularite: 1,
        },
      },
      {
        $sort: { popularite: -1 },
      },
      {
        $limit: argv.nb,
      },
    ]

    const startTime = new Date().getTime()
    const result = await db
      .collection("musiques")
      .aggregate(aggregationPipeline)
      .toArray()

    const endTime = new Date().getTime()
    const executionTime = endTime - startTime

    console.log(`Nombre de documents retournés : ${result.length}`)
    console.log(`Temps d'exécution : ${executionTime} ms`)

    client.close()
  } catch (err) {
    console.error(err)
  }
}

searchDocuments()
