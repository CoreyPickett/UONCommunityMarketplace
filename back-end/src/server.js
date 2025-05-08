//Server file for backend, currently connects to mongodb locally
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();

app.use(express.json());

let db;

async function connectToDB() {
  const uri = 'mongodb://127.0.0.1:27017';

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

  
async function start() {
  await connectToDB();
  app.listen(8000, function() {
    console.log('Server is listening on port 8000');
  });
}

start();