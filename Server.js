var express = require("express");
var app = express();
var router = express.Router();
var kothRoute = require("./kothRoute")

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var listEndpoints = require("express-list-endpoints");
var apiList = null;


router.use(function (req,res,next) {
  console.log("/" + req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Adds a route to the root path of the URL
app.use("/koth", kothRoute);

// This default path returns all the endpoints available in this app
app.get("/", function (req, res) {
  console.info(apiList);
  res.send(apiList);
});

apiList = listEndpoints(app);

let port = process.env.PORT || 3000;

app.listen(port,function(){
  console.log(`Live at Port ${port}`);
});
