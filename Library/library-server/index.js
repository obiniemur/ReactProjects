const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const corsOptions = {
    origin: ["https://obi-library.web.app", "https://obi-library.firebaseapp.com"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.snkkzgn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
    

const logger = async(req, res, next) =>{
    console.log("called", req.hostname, req.originalUrl);
    next();
}


const verifyToken = async(req, res, next)=>{
    const token = req.cookies?.token;
    console.log('value of token from the middle wear', token);

    if(!token){
        return res.status(401).send("Not Authorized");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN,(err, decoded)=>{
        if(err){
            return res.status(401).send("Not Authorized");
        }
        console.log("test", decoded);
        req.user = decoded;
        next();
    })
}







async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const BookCollection = client.db("Obi_Library").collection("AllBooks");
    const borrowedBooks = client.db("Obi_Library").collection("borrowBook");

    ///All Get methods
    app.get("/findCategory", logger, async (req, res) => {
      const result = await BookCollection.aggregate([
        {
          $group: {
            _id: "$lowerCaseCategory",
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
            image: 1,
            lowerCaseCategory: 1,
          },
        },
      ]).toArray();
      res.send(result);

    });

    app.get("/books/:category", async (req, res) => {
      const category = req.params.category;
      console.log(category);
      const query = {lowerCaseCategory: category};
      const result = await BookCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });


    app.get('/bookdetails/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await BookCollection.find(query).toArray();
        res.send(result)
    })





    //Get book from borrowed list filtered by user email
    app.get('/borrowed',verifyToken, async(req, res)=>{
        let query = {};
        if(req.query?.email !== req.user.email){
            return res.status(403).send({message: 'forbidden access'})
        }
        if(req.query?.email){
            query = {userName: req.query.email}
        }
        
        const result = await borrowedBooks.find(query).toArray();
        console.log(result)
        res.send(result);

    })


    app.post("/AddBook", async (req, res) => {
      const Books = req.body;
      console.log(Books);
      const result = await BookCollection.insertOne(Books);
      res.send(result);
    });


    //add book to borrowed list
    app.post('/borrow/:id', async(req, res)=>{
        const borrowed = req.body;
        console.log('server hitting ', borrowed)
        const result = await borrowedBooks.insertOne(borrowed);
        res.send(result)
    })


    //Add token to cookies when user login
    app.post('/jwt', logger, async(req, res)=>{
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN,{expiresIn: "1h"});
        console.log('token after login', token);
        res.cookie("token", token, {httpOnly:true, secure:true, sameSite: "none"}).send({success: true})
    })


    //Update Count when someone borrow a book
    app.put('/borrower/:id', async(req, res)=>{
        const id = req.params.id;
        const body = req.body;
        console.log(body.quantity)
        const query = {_id: new ObjectId(id)};
        const updateDoc = {
            $set: {
                quantity: -body.quantity
            }
        }
        const result = await BookCollection.updateOne(query, updateDoc);
        res.send(result);
    })

    app.put('/updateBooks/:id', logger, async(req, res)=>{
        
        const body = req.body;
        const image = body.image;
        const bookName=body.bookName;
        const authorName=body.authorName;
        const quantity=body.quantity;
        const lowerCaseCategory = body.lowerCaseCategory;
        const description = body.description;
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const updateDoc = {
            $set:{
                image: image,
                bookName:bookName,
                authorName:authorName,
                quantity:quantity,
                lowerCaseCategory:lowerCaseCategory,
                description:description
            }
        }

        const result = await BookCollection.updateOne(query, updateDoc);
        console.log(result);
        res.send(result)
    })


    app.delete('/deleteBook/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await BookCollection.deleteOne(query);
        console.log(result)
        res.send(result)
    })

    app.delete('/deleteBookFromBorrowPage/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await borrowedBooks.deleteOne(query);
      res.send(result)
    })




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
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
