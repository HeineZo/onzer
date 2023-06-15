import fs from "fs"
import { ObjectId } from "mongodb"

import { capitalize } from "@/lib/utils"

import clientPromise from ".."

const databaseName = "playlists"
let client
let db
let playlist

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
      playlist = await db.createCollection(databaseName, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["titre", "createur"],
            properties: {
              titre: {
                bsonType: "string",
              },
              description: {
                bsonType: "string",
              },
              createur: {
                bsonType: "string",
              },
              musiques: {
                bsonType: "array",
                items: {
                  bsonType: "objectId",
                },
              },
            },
          },
        },
      })

      //   Ajout des musiques de base
      const data = await JSON.parse(
        fs.readFileSync(
          `${process.cwd()}/lib/mongo/playlist/basePlaylist.json`,
          "utf8"
        )
      )

      for (let i = 0; i < data.length; i++) {
        data[i].musiques = data[i].musiques.map((id) => new ObjectId(id))
      }
      await playlist.insertMany(data)
    } else {
      playlist = db.collection(databaseName)
    }
  } catch (e) {
    console.log(e)
  }
}

;(async () => {
  await init()
})()

/**
 * Récupère toutes les playlists
 * @returns Toutes les musiques de la collection Playlist
 */
export async function getAllPlaylist() {
  try {
    if (!playlist) {
      await init()
    }
    const result = await playlist
      .find({})
      .map((playlist) => ({ ...playlist, _id: playlist._id.toString() })) //Transforme l'id en string
      .toArray()
    return { playlists: result }
  } catch (e) {
    return { error: "Impossible de récupérer les playlists" }
  }
}

/**
 * Récupère une playlist par son id
 * @param id Id de la playlist
 * @returns Playlist récupérée de la base de données
 */
export async function getPlaylist(id) {
  try {
    if (!playlist) {
      await init()
    }

    let result = await playlist
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "musiques",
            localField: "musiques",
            foreignField: "_id",
            as: "musiques",
          },
        },
      ])
      .toArray()

    result = { ...result[0], _id: result[0]._id.toString() }
    return { playlist: result }
  } catch (e) {
    console.log(e)
    return { error: "Impossible de récupérer la playlist" }
  }
}

/**
 * Créé une nouvelle playlist
 * @param data Données de la playlist
 * @returns Si l'insertion a réussie, renvoi l'id du nouveau document et un message, sinon renvoi false avec un autre message
 */
export async function addPlaylist(data) {
  let success = false
  let message = "Impossible de créer la playlist"
  try {
    if (!playlist) {
      await init()
    }
    success = await playlist.insertOne(data)
    if (success) {
      success = success.acknowledged
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
 * Retire des musiques d'une playlist
 *
 * @param id Id de la playlist
 * @param musicIds Id des musiques à supprimer
 */
export async function removeMusicFromPlaylist(id, musicIds) {
  let success = false
  let message = "Impossible de supprimer la musique de la playlist"
  try {
    if (!playlist) {
      await init()
    }
    success = await playlist.updateOne(
      { _id: new ObjectId(id) },
      { $pullAll: { musiques: musicIds.map((musicId) => new ObjectId(musicId)) } }
    )

    if (success) {
      success = success.acknowledged
      if (musicIds.length > 1) {
        message = `Les musiques ont été supprimé de la playlist`
      } else {
        message = `La musique a été supprimé de la playlist`
      }
    }
  } catch (e) {
    console.log(e)
  }

  return {
    success,
    message,
  }
}
