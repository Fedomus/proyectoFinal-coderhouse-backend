import * as dotenv from 'dotenv'
dotenv.config()

export const MONGO_URI = process.env.MONGO_URI || ''
export const FIRESTORE_FILE = process.env.FIRESTORE_FILE || ''
