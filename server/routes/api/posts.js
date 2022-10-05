const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const uri = 'mongodb+srv://pathfinderDbUser:P2thfinder2ndEdition1@cluster0.dri3r.mongodb.net/?retryWrites=true&w=majority';
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true});

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();

    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {   
    client.connect(async err => {
        const collection = client.db("pathfinderDb").collection("posts");
        await collection.insertOne({
            text: req.body.text,
            createdAt: new Date()
        });
        res.status(201).send(); 
        client.close
    })       
})

// Delete Posts
router.delete('/:id', async (req, res) => {   
    client.connect(async err => {
        const collection = client.db("pathfinderDb").collection("posts");
        await collection.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
        res.status(200).send(); 
        client.close
    })       
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://pathfinderDbUser:P2thfinder2ndEdition1@cluster0.dri3r.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true
    });

    return client.db('pathfinderDb').collection('posts');
}

module.exports = router;