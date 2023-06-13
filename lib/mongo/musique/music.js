import fs from "fs"

import clientPromise from ".."
import { ObjectId } from "mongodb"

const albumArt = require("album-art")

const databaseName = 'musiques'
let client
let db
let music

/**
 * Initialise la connexion à la base de données
 */
async function init() {
  try {
    client = await clientPromise
    db = client.db("onzer")

    const collections = await db.listCollections().toArray()
    const collectionExists = collections.some(
      (collection) => collection.name === databaseName
    )
    if (!collectionExists) {
      music = await db.createCollection(databaseName, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: [
              "titre",
              "artistes",
              "duree",
              "genres",
              "pays",
              "dateSortie",
            ],
            properties: {
              titre: {
                bsonType: "string",
              },
              artistes: {
                bsonType: "array",
                items: {
                  bsonType: "string",
                },
              },
              pochetteAlbum: {
                bsonType: "string",
              },
              duree: {
                bsonType: "number",
              },
              genres: {
                bsonType: "array",
                items: {
                  bsonType: "string",
                  enum: [
                    "rock",
                    "pop",
                    "jazz",
                    "rap",
                    "hip-hop",
                    "classique",
                    "electro",
                    "folk",
                    "reggae",
                    "R&B",
                    "autre",
                  ],
                },
              },
              pays: {
                bsonType: "string",
              },
              dateSortie: {
                bsonType: "date",
              },
            },
          },
        },
      })

      //   Ajout des musiques de base
      const data = JSON.parse(
        fs.readFileSync(
          `${process.cwd()}/lib/mongo/musique/baseMusic.json`,
          "utf8"
        )
      )
      for (let i = 0; i < data.length; i++) {
        data[i].dateSortie = new Date(data[i].dateSortie)
      }
      await music.insertMany(data)
    } else {
      music = db.collection(databaseName)
    }
  } catch (e) {
    console.log(e)
    // throw new Error('Impossible de se connecter à la base');
  }
}

;(async () => {
  await init()
})()



/**
 * Récupère toutes les musiques
 * @returns Toutes les musiques de la collection Musique
 */
export async function getAllMusic() {
  try {
    if (!music) {
      await init()
    }
    const result = await music
      .find({}, {titre: 1, artistes: 1, pochetteAlbum: 1})
      .map((music) => ({ ...music, _id: music._id.toString() })) //Transforme l'id en string
      .toArray()


    return { musics: result }
  } catch (e) {
    console.log(e)
    return { error: "Impossible de récupérer les musiques" }
  }
}

/**
 * Récupère une musique par son id
 * @returns Musique récupérée de la base de données
 */
export async function getMusic(id) {
  try {
    if (!music) {
      await init()
    }
    let result = await music.findOne({'_id': new ObjectId(id)})
    result = { ...result, _id: result._id.toString()}

    return { music: result }
  } catch (e) {
    console.log(e)
    return { error: "Impossible de récupérer la musique" }
  }
}

export async function addMusic(data) {
  console.log(data)
  try {
    if (!music) {
      await init()
    }
    const result = await music.insertOne(data)
    return { music: result.ops[0] }
  } catch (e) {
    console.log(e)
    return { error: "Impossible d'ajouter la musique" }
  }
}
