var express = require('express');
var router = express.Router();
var stock = require("../Models/Stock")
const { MongoClient } = require('mongodb');
var scriptRouter = require('./script')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loadStocksData', function (req, res) {
  try {
    scriptRouter.downloadAndStoreData()
    res.status(200).json({ status: true })
  } catch (error) {
    res.status(404).json({ status: false })
  }
});

router.get("/top10stocks", async (req, res) => {
  const mongoClient = new MongoClient('mongodb://localhost:27017');

  try {
    await mongoClient.connect();
    const database = mongoClient.db('bhavapp');
    const stockCollection = database.collection('stocks');

    // Replace 'fieldName' with the field you want to use for sorting
    const fieldName = 'high';

    const aggregationPipeline = [
      { $group: { _id: '$' + fieldName, doc: { $first: '$$ROOT' } } },
      { $sort: { _id: -1 } }, // Sort in descending order based on the field
      { $limit: 10 }
    ];

    // Execute the aggregation pipeline
    const top10DistinctRecords = await stockCollection.aggregate(aggregationPipeline).toArray();

    console.log('Top 10 Records:', top10DistinctRecords);

    res.status(200).json({ data: top10DistinctRecords, status: true })
  } finally {
    await mongoClient.close();
  }
});







//const express = require('express');
//const MongoClient = require('mongodb').MongoClient;

//const app = express();
//const port = 3000;

const url = 'mongodb://localhost:27017'; // replace with your MongoDB connection string
const dbName = 'bhavapp'; // replace with your database name



//find stock by using name direct by giving name in query
  router.post('/search_by_name', async(req, res) => {
  const searchQuery = req.query.stockname;

  const mongoClient = new MongoClient('mongodb://localhost:27017');

  try {
    await mongoClient.connect();
    const database = mongoClient.db('bhavapp');
    const stockCollection = database.collection('stocks');

    const top10DistinctRecords = await stockCollection.findOne({ name:searchQuery  });

    console.log('Top 10 Records:', top10DistinctRecords);

    res.status(200).json({ data: top10DistinctRecords, status: true })
  } finally {
    await mongoClient.close();
  }
});
//find stock by name using params in query
/*
router.get('/search_by_name/:query', async(req, res) => {
  const searchQuery = req.params.query;

  const mongoClient = new MongoClient('mongodb://localhost:27017');

  try {
    await mongoClient.connect();
    const database = mongoClient.db('bhavapp');
    const stockCollection = database.collection('stocks');

    const top10DistinctRecords = await stockCollection.findOne({ name:searchQuery  });

    console.log('Top 10 Records:', top10DistinctRecords);

    res.status(200).json({ data: top10DistinctRecords, status: true })
  } finally {
    await mongoClient.close();
  }
});
*/

module.exports = router;




 
/* find stock by name using params in query
  router.post('/search_by_name', async(req, res) => {
  const searchQuery = req.query.stockname;

  const mongoClient = new MongoClient('mongodb://localhost:27017');

  try {
    await mongoClient.connect();
    const database = mongoClient.db('bhavapp');
    const stockCollection = database.collection('stocks');

    const top10DistinctRecords = await stockCollection.findOne({ name:searchQuery  });

    console.log('Top 10 Records:', top10DistinctRecords);

    res.status(200).json({ data: top10DistinctRecords, status: true })
  } finally {
    await mongoClient.close();
  }
});

*/

