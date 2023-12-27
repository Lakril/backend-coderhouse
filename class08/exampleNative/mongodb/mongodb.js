import { MongoClient, ServerApiVersion } from "mongodb"

const uri = "mongodb+srv://lakril:oOLmQH92SqAxGgHR@atlascluster.ghqx0ai.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

await client.connect();

const db = client.db("coderhouse")

export const dbPersonas = db.collection("personas"); // Await the result of the db promise
export const dbProductos = db.collection("productos"); // Await the result of the db promise


// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         const db = client.db("coderhouse")
//         const dbPersonas = (await db).collection("personas"); // Await the result of the db promise
//         const personas = await dbPersonas.find().toArray();
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");

//         // const cursor = dbPersonas.find();
//         // await cursor.forEach(doc => console.dir(doc));
//         console.log(personas)
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);