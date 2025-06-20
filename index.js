require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute.js");





// holdimg model import use for temprary data table 
const { HoldingsModel } = require('./Models/HoldingsModel.js');
const { PositionModel } = require('./Models/PositionModel.js');
const { WatchlistModel } = require('./Models/WatchlistModel.js');

const PORT = process.env.PORT || 5000 ;
//MongoDb Connect
const uri = process.env.MONGO_URL;
 mongoose.connect(uri)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection error:", err);
  });

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);




app.get('/allHoldings', async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
  

})
app.get('/allPositions', async (req, res) => {
  let allPositions = await PositionModel.find({});
  res.json(allPositions);

})
app.get('/allWatchlist',async(req,res)=>{
  let allWatchlist=await WatchlistModel.find({});
  res.json(allWatchlist);

})

//-------------------------------------------------------Tempapry Data send to MongoDB------------------


//temprary data get from data.js file and snd to mongoDB
// app.get("/addHoldings", async (req, res) => {
//     let tempHoldings = [
//         {
//             name:"BHARTIARTL",
//             qty: 2,
//             avg: 538.05,
//             price: 541.15,
//             net: "+0.58%",
//             day: "+2.99%",
//         },
//         {
//             name: "HDFCBANK",
//             qty: 2,
//             avg: 1383.4,
//             price: 1522.35,
//             net: "+10.04%",
//             day: "+0.11%",
//         },
//         {
//             name: "HINDUNILVR",
//             qty: 1,
//             avg: 2335.85,
//             price: 2417.4,
//             net: "+3.49%",
//             day: "+0.21%",
//         },
//          {
//             name: "ITC",
//             qty: 5,
//             avg: 202.0,
//             price: 207.9,
//             net: "+2.92%",
//             day: "+0.80%",
//         },
//         {
//             name: "KPITTECH",
//             qty: 5,
//             avg: 250.3,
//             price: 266.45,
//             net: "+6.45%",
//             day: "+3.54%",
//         },
//             {
//             name: "RELIANCE",
//             qty: 1,
//             avg: 2193.7,
//             price: 2112.4,
//             net: "-3.71%",
//             day: "+1.44%",
//         },

//         {
//             name: "SGBMAY29",
//             qty: 2,
//             avg: 4727.0,
//             price: 4719.0,
//             net: "-0.17%",
//             day: "+0.15%",
//         },

//         {
//             name: "WIPRO",
//             qty: 4,
//             avg: 489.3,
//             price: 577.75,
//             net: "+18.08%",
//             day: "+0.32%",
//         },
//     ];

//     tempHoldings.forEach((item) => {
//         let newHolding = new HoldingsModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         })
//         newHolding.save();
//     })
//     res.send("Done!")
// })

// Position temp data
// app.get("/addPositions", async (req, res) => {
//     let tempPosition =[
//         {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];

//     tempPosition.forEach((item) => {
//         let newPosition = new PositionModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         })
//         newPosition.save();
//     })
//     res.send("Done!")
// })

// app.get("/addWatchlists", async (req, res) => {
//   let tempWatchlist = [
//     { name: "INFY", price: 1555.45, percent: "-1.60%", isDown: true },
//     { name: "ONGC", price: 116.8, percent: "-0.09%", isDown: true },
//     { name: "TCS", price: 3194.8, percent: "-0.25%", isDown: true },
//     { name: "KPITTECH", price: 266.45, percent: "3.54%", isDown: false },
//     { name: "QUICKHEAL", price: 308.55, percent: "-0.15%", isDown: true },
//     { name: "WIPRO", price: 577.75, percent: "0.32%", isDown: false },
//     { name: "M&M", price: 779.8, percent: "-0.01%", isDown: true },
//     { name: "RELIANCE", price: 2112.4, percent: "1.44%", isDown: false },
//     { name: "HUL", price: 512.4, percent: "1.04%", isDown: false },
//   ];
//    try {
//     const newWatchlist = tempWatchlist.map(item => ({
//       name: item.name,
//       price: item.price,
//       percentage: item.percent,
//       isdown: item.isDown,
//     }));

//     await WatchlistModel.insertMany(newWatchlist);

//     res.send("Done!");
//   } catch (error) {
//     console.error("Error adding watchlists:", error);
//     res.status(500).send("Failed to add watchlists.");
//   }
// });


//Order data

// app.post("/newOrder", async (req, res) => {
//   let newOrder = new OrdersModel({
//     name: req.body.name,
//     qty: req.body.qty,
//     price: req.body.price,
//     mode: req.body.mode,
//   });

//   newOrder.save();

//   res.send("Order saved!");
// });



