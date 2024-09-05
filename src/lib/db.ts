import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb"

const uri = "mongodb://localhost:27017/MessageBoard"
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client: MongoClient
let db: Db
let messages: Collection

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "mongodb://localhost:27017/MessageBoard"')
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}

// 初始化資料庫和集合
async function init() {
  if (!client.connect()) await client.connect()
  db = client.db("MessageBoard")
  messages = db.collection("messages")
}

init().catch(console.error)

// 導出 client、db 和 messages 集合
export { client, db, messages }