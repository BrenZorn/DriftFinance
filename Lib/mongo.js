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
    Email: email
  }
  try{
    await client.connect();
    await client.db("DriftFinance").collection("Users").insertOne(userModel)
  }catch(err){
    console.log(err)
    await client.close()
  }
}

const getUser = async (email)=>{
  try{
    await client.connect()
    let query = {Email: email}
    let user = await client.db("DriftFinance").collection("Users").findOne(query)
    if (!user) {
      console.log("User not found");
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Optional: re-throw the error
  }
};

const updateIncome = async (income, id)=>{
  try{
    await client.connect()
    let query = {userID: id} 
    let user = await client.db("DriftFinance").collection("Income").findOne(query)
    if(!user){
      let incomeModle = {
        userID: id,
        Income: income
      }
      console.log('user not found')
      await client.db("DriftFinance").collection("Income").insertOne(incomeModle)
      return true
    }
    await client.db("DriftFinance").collection("Income").updateOne({userID:id},{$set:{Income: income}})
    return true
  }catch(error){
    console.error("Error updating income:", error);
    await client.close()
    return false
  }
}

module.exports = {
    run,
    addUser,
    getUser,
    updateIncome
}