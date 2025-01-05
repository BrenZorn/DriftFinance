const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const uri = `mongodb+srv://tacknsmack1516:${process.env.MongoDB_PW}@driftfinancecluster.b37gq.mongodb.net/?retryWrites=true&w=majority&appName=DriftFinanceCluster`;
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

const addUser = async (id, username, email)=>{
  const userModel = {
    FireBaseID:id,
    UserName: username,
    Emial: email
  }
  try{
    await client.connect();
    await client.db("DriftFinance").collection("Users").insertOne(userModel)
  }catch(err){
    console.log(err)
    await client.close()
  }
}

module.exports = {
    run,
    addUser
}