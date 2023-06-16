import fs from "fs"
import { ObjectId } from "mongodb"

import clientPromise from ".."

const albumArt = require("album-art")

const databaseName = "musiques"
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
                    "funk",
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
        data[i]._id = new ObjectId(data[i]._id)
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
      .find({}, { titre: 1, artistes: 1, pochetteAlbum: 1 })
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
    let result = await music.findOne({ _id: new ObjectId(id) })
    result = { ...result, _id: result._id.toString() }

    return { music: result }
  } catch (e) {
    console.log(e)
    return { error: "Impossible de récupérer la musique" }
  }
}


/**
 * Créé une nouvelle musique
 * @param data Données de la musique
 * @returns  Si l'insertion a réussie, renvoi l'id du nouveau document et un message, sinon renvoi false avec un autre message
 */
export async function addMusic(data) {
  let success = false
  let message = "Impossible d'ajouter la musique"
  try {
    if (!music) {
      await init()
    }
    success = await music.insertOne(data)
    success = success.insertedId.toString()
    if (success) {
      message = `${data.titre} a été ajouté à la base de données`
    }
  } catch (e) {
    console.log(e)
  }

  return {
    success,
    message,
  }
}

/**
 * Modifie une musique existante
 * @param data Données de la musique modifiée
 * @returns Si la modification a réussie, renvoi l'id du document modifié et un message, sinon renvoi false avec un autre message
 */
export async function editMusic(data) {
  let success = false
  let message = "Impossible de modifier la musique"
  try {
    if (!music) {
      await init()
    }
    const { _id, ...dataWithoutId } = data
    success = await music.updateOne(
      { _id: new ObjectId(_id) },
      { $set: dataWithoutId }
    )
    success = success.acknowledged
    if (success) {
      message = `${data.titre} a été modifié avec succès`
    }
  } catch (e) {
    console.log(e)
  }

  return {
    success,
    message,
  }
}

/**
 * Supprimer une musique
 * @param id Identifiant permettant d'identifier la musique à supprimer
 * @returns Si la suppression a réussie, renvoi l'id du document supprimé et un message, sinon renvoi false avec un autre message
 */
export async function deleteMusic(id) {
  let success = false
  let message = "Impossible de supprimer la musique"
  try {
    if (!music) {
      await init()
    }
    success = await music.deleteOne({ _id: new ObjectId(id) })
    success = success.acknowledged
    if (success) {
      message = `La musique a été supprimée avec succès`
    }
  } catch (e) {
    console.log(e)
  }

  return {
    success,
    message,
  }
}

/**
 * Récupère les playlists dans lesquelles la musique figure
 * @param id Identifiant de la musique
 * @returns Les playlists dans lesquelles la musique figure
 */
export async function musicWithinPlaylist(id) {
  try {
    if (!music) {
      await init()
    }
    let result = await music
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "playlists",
            localField: "_id",
            foreignField: "musiques",
            as: "playlists",
            pipeline: [
              {
                $project: {
                  musiques: 0,
                },
              },
            ],
          },
        },
      ])
      .toArray()

    result = { ...result[0], _id: result[0]._id.toString() }
    return { music: result }
  } catch (e) {
    console.log(e)
    return { error: "Impossible de récupérer les playlists" }
  }
}

/**
 * Recherche une musique par filtre
 * @param {*} filter Filtre appliqué
 * @param {*} query Recherche par rapport au filtre
 */
export async function search(filter, query) {
  try {
    if (!music) {
      await init()
    }

    const regexQuery = new RegExp(query, "i")
    let searchCriteria = {}

    if (filter === "genres" || filter === "artistes") {
      searchCriteria[filter] = { $elemMatch: { $regex: regexQuery } }
    } else {
      searchCriteria[filter] = { $regex: regexQuery }
    }
    let result = await music
      .find(searchCriteria, { titre: 1, artistes: 1, pochetteAlbum: 1 })
      .map((music) => ({ ...music, _id: music._id.toString() })) //Transforme l'id en string
      .toArray()

    if (query.length === 0) {
      result = getAllMusic()
    }
    return { musics: result }
  } catch (e) {
    console.log(e)
    return { error: "Impossible de récupérer les musiques" }
  }
}
