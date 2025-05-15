//Server file for backend, currently connects to mongodb locally
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();

app.use(express.json());

let db;

// change here is to access the online version of mongodb with a defult of a local hst
async function connectToDB() {
  const uri = process.env.MONGODB_USERNAME 
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

app.post('/api/items/:name/upvote', async (req, res) => {
  const { name } = req.params;

  const updatedItem = await db.collection('items').findOneAndUpdate({ name }, {
    $inc: { upvotes: 1 }
  }, {
    returnDocument: "after",
  });

  res.json(updatedItem);
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text };
  
    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
      $push: { comments: newComment }
    }, {
      returnDocument: 'after',
    });
  
    res.json(updatedArticle);
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