const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const express = require("express");
const morgan = require("morgan");

const cors = require("cors");
const app = express();

require("dotenv").config();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const uri = `mongodb+srv://${process.env.user_name}:${process.env.pass}@cluster0.kc0voal.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const DB = client.db("used_car_shop_DB");
    const used_car_coll = DB.collection("use_Cars");
    const cartCar = DB.collection("MyCart");


    //Get all the unique Brand for home page
    app.get("/Allbrands", async (req, res) => {
        const result = await used_car_coll.aggregate([
            {
              $group: {
                _id: "$brand.convert_Brand",
                doc: { $first: "$$ROOT" }
              }
            },
            {
              $replaceRoot: {
                newRoot: "$doc"
              }
            }
          ]).toArray();

          console.log(result)

      res.send(result);
      console.log(result);
    });


    //get car based on brandname
    app.get('/brands/:brand_name', async(req, res)=>{
        const brand_name = await req.params.brand_name;

        const query = {'brand.convert_Brand': brand_name}
        const cursor =  used_car_coll.find(query)
        const result = await cursor.toArray();
        console.log(result)
        res.send(result);
        
    })

    //get car details by id
    app.get('/details/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const cursor = await used_car_coll.findOne(query);
      res.send(cursor);
    })

    //get car list of cart
    app.get('/cart/cars', async(req, res)=>{
      const cursor =  cartCar.find();
      const result = await cursor.toArray()
      console.log(result)
      res.send(result);
    })


    //add car to cart collection
    app.post('/details/:id', async(req, res)=>{
      const cart = req.body;
      console.log('car body is', cart)
      const result = await cartCar.insertOne(cart)
      console.log('server is hitting', result)
      res.send(result);

    })

    //Add car to data base
    app.post("/addcar", async (req, res) => {
      const carInfo = req.body;
      const result = await used_car_coll.insertOne(carInfo);
      res.send(result);
    });

    //delete item from cart
    app.delete('/delete/:id', async(req,res)=>{
      const id = req.params.id;
      console.log('param id', id);
      const query = {_id: new ObjectId(id)};
      const result = await cartCar.deleteOne(query)
      console.log('query', query);
      console.log(result)
      res.send(result)
    })



    await client.db("admin").command({ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
