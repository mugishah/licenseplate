import 'dotenv/config';
import { MongoClient, Db, Collection, InsertOneWriteOpResult } from 'mongodb';

// MongoDB configuration
const connectionString = process.env.MONGODB_CONNECTION_STRING || '';
const databaseName = process.env.MONGODB_DATABASE_NAME || '';
const collectionName = process.env.MONGODB_COLLECTION_NAME || '';

// Connect to the MongoDB database
async function connectToDatabase(): Promise<[MongoClient, Db, Collection]> {
  const client = new MongoClient(connectionString);
  if (!client) {throw new Error('Could not connect to the database');}
  await client.connect();

  const db = client.db(databaseName);
  if (!db) {throw new Error('Could not connect to the database name');}

  const collection = db.collection(collectionName);
  if (!collection) {throw new Error('Could not connect to the collection');}
  if( client || db || collection ) console.log('Connected to the database');
  return [client, db, collection];
}

// Save data to the database
export async function saveToDatabase(data: any): Promise<InsertOneWriteOpResult<any>> {
  try {
    const [client, db, collection] = await connectToDatabase();
    const result = await collection.insertOne(data);
    client.close();
    return result;
  } catch (error) {
    console.error('An error occurred while saving to the database:', error);
    throw error;
  }
}

// Retrieve data from the database
export async function getDataFromDatabase(): Promise<any[]> {
  try {
    const [client, db, collection] = await connectToDatabase();
    const data = await collection.find({}).toArray();
    client.close();
    return data;
  } catch (error) {
    console.error('An error occurred while retrieving data from the database:', error);
    throw error;
  }
}
