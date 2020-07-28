
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");


/** 2) A first working Express Server */
app.get("/", (req,res) => {
    res.send("Hello Express");
});

/** 3) Serve an HTML file */
app.get("/", (req,res) => {
    var absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
var assetFolder = __dirname + "/public";
app.use(express.static(assetFolder));

/** 5) serve JSON on a specific route */
app.get("/json", (req,res) => {
    res.json({"message" : "Hello json"});
});

/** 6) Use the .env file to configure the app */
process.env.MESSAGE_STYLE="uppercase"
app.get("/json", (req,res) => {
    if(process.env.MESSAGE_STYLE == "uppercase")
    {
        res.json({"message" : "HELLO JSON"});
    }
    else{
        res.json({"message" : "Hello json"});
    }
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

app.use(function logger(req, res, next){
    console.log(req.method + " " + req.path + " - "+ req.ip);
    next();
});

/** 8) Chaining middleware. A Time server */
function getTheTime(req, res, next)
{
    return new Date().toString();
}
app.get('/now', function(req, res, next) {
    req.time = getTheTime();  // Hypothetical synchronous operation
    next();
  }, function(req, res) {
    res.json({"time" : req.time});
  });

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req,res) => {
    var word = req.params.word;
    res.json({"echo" : word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req,res) => {
    var firstname = req.query.first;
    var lastname = req.query.last;
    res.json({"name" : `${firstname} ${lastname}`});
});

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/** 12) Get data form POST  */
app.post("/name", (req,res) => {
    var string = req.body.first + " " + req.body.last;
    res.json({"name" : string});
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
