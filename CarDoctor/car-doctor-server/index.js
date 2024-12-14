const express = require("express");
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

const port = process.env.Port || 5000;

//Middle ware

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.snkkzgn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const logger = async (req, res, next) => {
  console.log("Called: ", req.host, req.originalUrl);
  next();
};

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log("value of token in middle wear", token);

  if (!token) {
    return res.status(401).send("Not Authorized");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Not Authorized");
    }

    console.log("test", decoded);
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    const carCollection = client.db("Car-Doctor").collection("Car-Services");
    const bookingCollection = client.db("Car-Doctor").collection("bookings");

    //Auth related API

    app.post("/jwt", logger, async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
      console.log('token after logging in',token)
      res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "none"}).send({success: true});
    });

    //Services related API
    app.get("/services", logger, async (req, res) => {
      console.log("bissoy behaya", req.cookies.token);
      const cursor = carCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/services/:id", logger, async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const option = {
        projection: {title: 1, price: 1, service_id: 1, img: 1},
      };
      const result = await carCollection.findOne(query, option);
      res.send(result);
    });

    //Bookings

    app.get("/bookings", logger, verifyToken, async (req, res) => {
      let query = {};

      if(req.query?.email !== req.user.email){
        return res.status(403).send({message: 'forbidden access'})
      }
      if (req.query?.email) {
        query = {email: req.query.email};
      }
      console.log('user from verify token', req.user);
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/bookings", logger, async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    app.patch("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updatedBooking = req.body;
      const updateDoc = {
        $set: {
          status: updatedBooking.status,
        },
      };
      const result = await bookingCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Doctor is running");
});

app.listen(port, () => {
  console.log(`Doctor is running on ${port}`);
});
