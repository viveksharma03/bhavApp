var express = require("express");
var router = express.Router();
var scriptRouter = require("./script");
var stock = require("../Models/Stock");
var favouriteStock = require("../Models/favourite");

router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/loadStocksData", function (req, res) {
  try {
    scriptRouter.downloadAndStoreData();
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false });
  }
});

router.get("/top_10_stocks", async (req, res) => {
  try {
    const top10Stocks = await stock.find().sort({ high: -1 }).limit(10);

    // console.log("Top 10 Records:", top10Stocks);

    res.status(200).json({ data: top10Stocks, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "", status: false });
  }
});

//find stock by using name direct by giving name in query
router.post("/search_by_name", async (req, res) => {
  const searchQuery = req.body.stockname;

  try {
    const findByName = await stock.findOne({
      name: searchQuery,
    });

    console.log("Stock:", findByName);

    res.status(200).json({ data: findByName, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "", status: false });
  }
});

router.post("/add_stock_in_favourite", async (req, res) => {
  const stockname = req.body.name;

  try {
    const findbyName = await stock.findOne({
      name: stockname,
    });

    // console.log(findByCode.name);

    let favStockObj = new favouriteStock();

    favStockObj.stockName = stockname;
    favStockObj.stockCode = findbyName.code;
    //favStockObj.stockCode = stockCode;
   // favStockObj.stockName = findByCode.name;

    favStockObj.save();

    res.status(200).json({
      msg: "Stock Added to Favourite Stock Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error", status: false });
  }
});

router.get("/all_favourite_stocks", async (req, res) => {
  try {
    const allFavouriteStocks = await favouriteStock.find();

    res.status(200).json({ data: allFavouriteStocks, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "", status: false });
  }
});

router.post("/delete_stock_from_favourite", async (req, res) => {
  const stockName = req.body.name;

  try {
    const findByCode = await favouriteStock.findOne({
      stockName: stockName,
    });

    // console.log(findByCode);

    if (findByCode === null) {
      res.status(404).json({ msg: "Stock Not Found!", status: false });
    } else {
      const deletedStock = await favouriteStock.deleteOne({
        stockName: stockName,
      });

      res.status(200).json({
        msg: "Stock Deleted from Favourite Stock Successfully",
        data: deletedStock,
        status: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error", status: false });
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



/*
router.post("/add_stock_in_favourite", async (req, res) => {
  const stockCode = req.body.code;

  try {
    const findByCode = await stock.findOne({
      code: stockCode,
    });

    // console.log(findByCode.name);

    let favStockObj = new favouriteStock();

    favStockObj.stockCode = stockCode;
    favStockObj.stockName = findByCode.name;

    favStockObj.save();

    res.status(200).json({
      msg: "Stock Added to Favourite Stock Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error", status: false });
  }
});

router.get("/all_favourite_stocks", async (req, res) => {
  try {
    const allFavouriteStocks = await favouriteStock.find();

    res.status(200).json({ data: allFavouriteStocks, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "", status: false });
  }
});

router.post("/delete_stock_from_favourite", async (req, res) => {
  const stockCode = req.body.code;

  try {
    const findByCode = await favouriteStock.findOne({
      stockCode: stockCode,
    });

    // console.log(findByCode);

    if (findByCode === null) {
      res.status(404).json({ msg: "Stock Not Found!", status: false });
    } else {
      const deletedStock = await favouriteStock.deleteOne({
        stockCode: stockCode,
      });

      res.status(200).json({
        msg: "Stock Deleted from Favourite Stock Successfully",
        data: deletedStock,
        status: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error", status: false });
  }
});*/