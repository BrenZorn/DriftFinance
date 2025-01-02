const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://tacknsmack1516:${process.env.MongoDB_PW}@driftfinance.vdsrs.mongodb.net/?retryWrites=true&w=majority&appName=DriftFinance`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("DriftFinance").collection("test").insertOne( { item: "card", qty: 15, id: 92432 } )
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {
    run
}