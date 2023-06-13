import clientPromise from ".."
import { ObjectId } from "mongodb"

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
              duree: {
                bsonType: "number",
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
      const data = JSON.parse(
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
 * @returns Playlist récupérée de la base de données
 */
export async function getPlaylist(id) {
  try {
    if (!playlist) {
      await init()
    }
    let result = await playlist.findOne({'_id': new ObjectId(id)})
    result = { ...result, _id: result._id.toString()}

    return { playlist: result }
  } catch (e) {
    console.log(e)
    return { error: "Impossible de récupérer la playlist" }
  }
}
