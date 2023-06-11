import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(url);
let clientPromise;

if (!global._mongoClientPromise) {
	global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
