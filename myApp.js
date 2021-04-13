var express = require('express');
var app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

console.log("Hello World");
app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html")
});

app.use("/public", express.static(__dirname + "/public"));


app.get('/json', (req, res) => {
  if(process.env.MESSAGE_STYLE === "uppercase") {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time})
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word}) //req.params.params1 
});

app.get("/name", (req, res) => {
  let string = req.query.first + " " + req.query.last;
  res.json({name: string});
});

app.post("/name", (req, res) => {
  let string = req.body.first + " " + req.body.last;
  res.json({name: string});
});
































 module.exports = app;
