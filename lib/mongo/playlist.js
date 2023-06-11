import clientPromise from '.';

let client;
let db;
let playlist;

/**
 * Initialise la connexion à la base de données
 */
async function init() {
	try {
		client = await clientPromise;
		db = client.db('onzer');
		playlist = db.createCollection('playlists', {
			validator: {
				$jsonSchema: {
					bsonType: 'object',
					required: ['titre', 'createur'],
					properties: {
						titre: {
							bsonType: 'string',
						},
						description: {
							bsonType: 'string',
						},
						createur: {
							bsonType: 'string',
						},
						duree: {
							bsonType: 'number',
						},
						musiques: {
							bsonType: 'array',
							items: {
								bsonType: 'objectId',
							},
						},
					},
				},
			},
		});
	} catch (e) {
		console.log('hello');

		console.log(e);
		// throw new Error('Impossible de se connecter à la base');
	}
}

(async () => {
	await init();
})();

// Fonctions de la base Playlist

/**
 * Récupère toutes les musiques
 * @returns Toutes les musiques de la collection Playlist
 */
export async function getAllPlaylist() {
	try {
		if (!playlist) {
			await init();
		}
		const result = await playlist
			.find({})
			.map((playlist) => ({ ...playlist, _id: playlist._id.toString() })) //Transforme l'id en string
			.toArray();
		return { playlists: result };
	} catch (e) {
		return { error: 'Impossible de récupérer les playlists' };
	}
}
