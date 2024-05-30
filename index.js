const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.json());

// 4P2raWOBDeu7LrUD


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4b5mrxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const foodsCollection = client.db('foodDB').collection('food');
    const reqCollection = client.db('foodDB').collection('requiest');
    // console.log(foodCollection)
    app.get("/addFood", async(req,res) => {
        const cursor = foodsCollection.find();
        const result = await cursor.toArray()
        res.send(result)
        
    })
    app.get("/addfood/:id",async(req,res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId (id) }
        const result = await foodsCollection.findOne(query)
        res.send(result)

    })
    app.post("/addFood", async (req, res) => {
        const newFood = req.body;
        console.log(newFood);
        const result = await foodsCollection.insertOne(newFood)
        res.send(result)
        // Here you can add your logic to save the new food item to the database
      });
     
    app.post("/requiest", async (req,res)=>{
        const reqData =req.body
      
        const result = await reqCollection.insertOne(reqData)
        res.send(result)
    })

      app.get('/addFoods/:email', async (req, res) => {
        const email = req.params.email;
        const query = { 'donator.email': email };
        const result = await foodsCollection.find(query).toArray();
        res.send(result);
    });
    app.get("/food",async(req,res)=>{
       const search = req.query.search
       let query = {
        foodName: { $regex: search, $options: 'i'}
       }
        const result = await foodsCollection
        .find(query).toArray()
        res.send(result)
    })
    app.delete('/addFood/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await foodsCollection.deleteOne(query);
        res.send(result);
    });
    app.put('/addFood/:id', async (req, res) => {
        const id = req.params.id;
       const foodData = req.body
       const query = { _id: new ObjectId(id) }
       const options = {upsert: true}
       const updateDoc = {
        $set:{
            ...foodData,
        }
       }
       const result = await foodsCollection.updateOne(query, updateDoc, options)
       res.send(result);
    });
    // get all req
    app.get('/requiest/:email', async (req, res) => {
        const email = req.params.email;
        const query = { 'user_email': email };
        const result = await reqCollection.find(query).toArray();
        res.send(result);
    });
    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
        
  }
}
run().catch(console.dir);

app.get('/',(req,res) => {
    res.send('doctor is running')
})

app.listen(port, ()=>{
    console.log(`Food Server Is running ${port}`)
})