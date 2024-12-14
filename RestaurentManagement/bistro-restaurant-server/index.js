const express = require("express");
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
require("dotenv").config();

const stripe = require("stripe")(process.env.Stripe_secret_key);

//Middlewear
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

    
    /**************************************
    All Built in Middle Wear starts here
    ************************************* */
    const verifyToken = (req, res, next) => {
      // console.log("Inside verify token ", req.headers);
      if (!req.headers.authorization) {
        return res.status(401).send({message: "Unauthorized Access"});
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.Access_token, (err, decoded) => {
        if (err) {
          return res.status(401).send({message: "Unauthorized Access"});
        }
        req.decoded = decoded;
        // console.log("Test", req.decoded);
        next();
      });
    };

    /*******************************************
    This middle wear will verify the admin. 
    ****************************************** */
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

    // All the collections names are here
    const menuCollection = client.db("BistroDB").collection("menu");
    const reviewsCollection = client.db("BistroDB").collection("reviews");
    const cartCollection = client.db("BistroDB").collection("carts");
    const userCollection = client.db("BistroDB").collection("users");
    const paymentCollection = client.db("BistroDB").collection("payments");

    /**************************************
          JWT related API
    ****************************************/
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.Access_token, {expiresIn: "1h"});
      res.send({token});
    });

    /**************************************User related API********************************************* */

    /************************************************************
        Get all users from the DB api
    *************************************************************/
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    /******************************************************************************************************
          insert users to database api
    ********************************************************************************************************/
    app.post("/users", async (req, res) => {
      const user = req.body;
      // insert email if user doesn't exist
      // we can do this in many ways (1. Use upsert, 2. email unique in mongo, 3. simple field check before saving it in database);
      const query = {email: user.email};
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({message: "user already exit"});
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    /****************************************************************************
          This api for admin only. this api allow make normal user to admin
    *****************************************************************************/
    app.patch("/users/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updatedDoc = {
        $set: {
          role: "admin",
        },
      };

      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

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

    /**********************************************************************
          Delete the user from DB
    ***********************************************************************/
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    /***********************************************All get method starts here************************************* */

    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    /*********************************************************************************************************************
        Getting cart data count for navbar cart icon. It will load user based icon. user will only see his cart item
    **********************************************************************************************************************/
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = {email: email};
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    /*********************************************************************************************************************
      This api is for loading single data based on the ID, for updating the item purpose
    **********************************************************************************************************************/
    app.get("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await menuCollection.findOne(query);
      res.send(result);
    });

    /*********************************Get method ends here*********************************************** */

    /*********************Post method start here********************************************************* */

    /*****************************************************
        Insert item to cert after user click on add to cart
    ******************************************************/
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
      const item = req.body;
      const result = await menuCollection.insertOne(item);
      res.send(result);
    });

    /*******************************************All Patch Api ****************************************************/


    /************************************************************************************************************
      This API update the menu Item. only admin can use this API
    *************************************************************************************************************/

    app.patch("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      console.log("hitting");
      const id = req.params.id;
      const body = req.body;
      const filter = {_id: new ObjectId(id)};
      console.log(body);

      const updatedDoc = {
        $set: {
          name: body.name,
          category: body.category,
          price: body.price,
          recipe: body.recipe,
          image: body.image,
        },
      };

      const result = await menuCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    /********************************************Delete method Starts here********************************* */

    /*************API for deleting item from carts************** */

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });

    /************************************************************************
    
    Payment related API

    **************************************************************************/

    app.get("/payments/:email", verifyToken, async (req, res) => {
      console.log("hi");
      const query = {email: req.params.email};
      console.log(query);
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({message: "Forbidden Access"});
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/create-payment-intent", async (req, res) => {
      const {price} = req.body;
      const amount = parseInt(price * 100);
      console.log("amount inside the intent", amount);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);

      //carefully delete all the item from certs after they paid the bill
      console.log("payment info", payment);

      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };

      const deleResult = await cartCollection.deleteMany(query);

      res.send({paymentResult, deleResult});
    });

    /*********************************************

    Api for admin home. these APIs will show all the stats.

    ********************************************** */

    app.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const menuItems = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();
      //this is not the best way to get revenues.
      // const payments = await paymentCollection.find().toArray();
      // const revenue = payments.reduce((total, payment)=> total + payment.price,0)

      //Best way connect multiple documents in mongoDB is aggregation pipeline.
      const result = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$price",
              },
            },
          },
        ])
        .toArray();

      const revenue = result.length > 0 ? result[0].totalRevenue : 0;
      res.send({users, menuItems, orders, revenue});
    });

    /***********************************************

   This API will be used for chart and PIE. advance api. using aggregate pipeline

    ********************************************** */

    app.get("/order-stats", verifyToken, verifyAdmin, async (req, res) => {
      const result = await paymentCollection
        .aggregate([
          {
            $unwind: "$menuItemIds",
          },
          {
            $lookup: {
              from: "menu",
              localField: "menuItemIds",
              foreignField: "_id",
              as: "menuItems",
            },
          },
          {
            $unwind: "$menuItems",
          },
          {
            $group: {
              _id: "$menuItems.category",
              quantity: {
                $sum: 1,
              },
              revenue: {$sum: "$menuItems.price"},
            },
          },
          {
            $project:{
              _id: 0,
              category: '$_id',
              quantity: '$quantity',
              revenue: '$revenue'


            }
          }
        ])
        .toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ping: 1});
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get(
  "/",
  (r = (req, res) => {
    res.send("Restaurant is running now");
  })
);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
