//Server file for backend, currently connects to mongodb locally
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';

const app = express();

const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


app.use(express.json());

let db;

// change here is to access the online version of mongodb with a defult of a local hst
async function connectToDB() {
  const uri = !process.env.MONGODB_USERNAME 
    ? 'mongodb://127.0.0.1:27017'
    : `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.gc0c2sd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();

  db = client.db('uon-marketplace-db');
}

app.get('/api/items/:name', async (req, res) => {
  const { name } = req.params;
  const item = await db.collection('items').findOne({ name });
  res.json(item);
});

app.use(async function(req, res, next) {
  const { authtoken } = req.headers;

  if (authtoken) {
    const user = await admin.auth().verifyIdToken(authtoken);
    req.user = user;
  } else {
    res.sendStatus(400);
  }

  next();
});

app.post('/api/items/:name/upvote', async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const item = await db.collection('items').findOne({ name });

  const upvoteIds = item.upvoteIds || [];
  const canUpvote = uid && !upvoteIds.includes(uid);

  if (canUpvote) {
    const updatedItem = await db.collection('items').findOneAndUpdate({ name }, {
      $inc: { upvotes: 1 },
      $push: { upvoteIds: uid },
    }, {
      returnDocument: "after",
    });

    res.json(updatedItem);
  } else {
    res.sendStatus(403);
  }
});

app.post('/api/items/:name/comments', async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text };

  const updatedItem = await db.collection('items').findOneAndUpdate({ name }, {
    $push: { comments: newComment }
  }, {
    returnDocument: 'after',
  });

  res.json(updatedItem);
});


// changed so that the pc it runs on can select a port with 8000 as defult
const PORT = process.env.PORT || 8000;
  
async function start() {
  await connectToDB();
  app.listen(PORT, function() {
    console.log('Server is listening on port ' + PORT);
  });
}

start();