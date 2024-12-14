const express = require("express");
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
const port = process.env.PORT || 5001;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@obi-restaurant-bistro.2flngl5.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const userCollection = client.db("PetAdoption").collection("users");
    const petCollection = client.db("PetAdoption").collection("Pets");
    const adopterCollection = client.db("PetAdoption").collection("Adopters");
    const myDonationCampCollection = client.db("PetAdoption").collection("DonationCamps");
    const donatorCollection = client.db("PetAdoption").collection("Donator");

    /********************************************************************
    Middle wear starts here
    *********************************************************************/

    //This middlewear will verify if the user has token and if it is valid
    const verifyToken = (req, res, next) => {

      if (!req.headers.authorization) {
        return res.status(401).send({message: "Unauthorized Access"});
      }
      const token = req.headers.authorization.split(" ")[1];
      
      jwt.verify(token, process.env.Access_token, (err, decoded) => {
        if (err) {
          return res.status(401).send({message: "Unauthorized Access"});
        }
        req.decoded = decoded;
        
        next();
      });
      
    };


    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = {email: email};
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";

      if (!isAdmin) {
        return res.status(403).send({message: "Forbidden Access (O bah Tomar access nai)"});
      }

      next();
    };

    /********************************************************************
    Middle wear Ends here
    *********************************************************************/

    /*******************************************************************
    Authentication Related APIs
    ********************************************************************/

    app.post("/jwt",   (req, res) => {
      const user = req.body;
      const result =   jwt.sign(user, process.env.Access_token, {expiresIn: "1h"});
      res.send({result});
    });

    /*******************************************************************
    Authentication Related APIs ends here
    ********************************************************************/

    //Get all pet categories
    app.get("/category", async (req, res) => {
      const result = await petCollection
        .aggregate([
          {
            $group: {
              _id: "$category",
              doc: {$first: "$$ROOT"},
            },
          },
          {
            $replaceRoot: {
              newRoot: "$doc",
            },
          },
          {
            $project: {
              category: 1,
              petImage: 1,
            },
          },
        ])
        .toArray();
       
      res.send(result);
    });

    //Get pets by category

    app.get("/pet/:category", async (req, res) => {
      const category = req.params.category;
      const query = {category: category};
      const result = await petCollection.find(query).toArray();
      console.log('/pet/:category', result)
      res.send(result);
    });

    app.get("/pet_detail/:id", async (req, res) => {
      const id = req.params.id;

      const query = {_id: new ObjectId(id)};
      const result = await petCollection.find(query).toArray();
      
      res.send(result);
    });

    app.get("/pets", async (req, res) => {
      const result = await petCollection.find().toArray();
      
      res.send(result);
    });

    //Get My pets based on logged in user
    app.get("/mypets", verifyToken, async (req, res) => {
      const email = req.query.email;
      if(email !== req.decoded.email){
        return res.status(403).send('Forbidden access')
      }
      const query = {user_email: email};
      const result = await petCollection.find(query).toArray();
      res.send(result);
    });

    //Updating Pets by user
    app.get("/updatePet/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await petCollection.find(query).toArray();

      res.send(result);
    });

    app.get('/allCamps', async(req, res)=>{
      const result = await myDonationCampCollection.find().toArray();
      res.send(result)
    })

    app.get('/myCamps', verifyToken, async(req, res)=>{
      const email = req.query.email;
      if(email !== req.decoded.email){
        return res.status(401).send('Unauthorized User')
      }
      const query = {user_email: email}
      const result = await myDonationCampCollection.find(query).toArray();
      console.log(result)
      res.send(result)
    })

    //getting all users
    app.get('/Allusers',  verifyToken, verifyAdmin, async(req, res)=>{
      const result = await userCollection.find().toArray()
      res.send(result)
    })

     /****************************************************************************** */
    //This API will show information based on the role. important one

    /*************************************************************************** */

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({message: "Forbidden Access"});
      }
      const query = {email: email};
      const user = await userCollection.findOne(query);
      let admin = false;
      //this condition first check if the user exist. if exist then if the admin. if the role is admin then it will make the role variable true.
      if (user) {
        admin = user?.role == "admin";
      }
      res.send({admin});
    });





    app.post("/users", async (req, res) => {
      const body = req.body;
      const name = body.name;
      const email = body.email;
      const image = body.image;

      const allUserInfo = {name, email, image};
      const existingUser = await userCollection.find({email: body.email}).toArray();

      if (existingUser?.email === email) {
        res.send({message: "user is already exist"});
        return;
      }
      const result = await userCollection.insertOne(allUserInfo);
      res.send(result);
    });

    //Adding pet
    app.post("/pets", async (req, res) => {
      const petInfo = req.body;
      const result = await petCollection.insertOne(petInfo);

      res.send(result);
    });

    //Saving adopter information to database

    app.post("/adopter_information", async (req, res) => {
      const body = req.body;
      const result = await adopterCollection.insertOne(body);
      res.send(result);
    });


    app.post('/donator', async(req, res)=>{
      const body = req.body;
      const result = await donatorCollection.insertOne(body)
      res.send(result)
    })


    app.post('/donation_camp', verifyToken, async(req, res)=>{
      const body = req.body;
      const result = await myDonationCampCollection.insertOne(body);
      res.send(result)
    })

    //This api will update the status of a pet from adoption false to true when someone adopt a pet
    app.put("/pet/adoption/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const updaetDoc = {
        $set: {
          adoption: true,
        },
      };
      const result = await petCollection.updateOne(query, updaetDoc);
      res.send(result);
    });

    app.patch("/updatePet/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      const query = {_id: new ObjectId(id)};
      const updateDoc = {
        $set: {
          name: body.name,
          age: body.age,
          category: body.category,
          location: body.location,
          short_desc: body.short_desc,
          long_desc: body.long_desc,
          petImage: body.petImage,
          date: body.date,
        },
      };

      const result = await petCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.patch('/makeAdmin/:id', verifyToken, async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const updaetDoc = {
        $set:{
          role: "admin"
        }
      }
      const result = await userCollection.updateOne(query, updaetDoc)
      res.send(result)
    })

    app.delete("/deletePet/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await petCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });

    await client.db("admin").command({ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Running by Obi");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
