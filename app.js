const express = require('express'),
    auth = require('./auth.js'),
    AMOCRM = require('amocrm-api'),
    https = require("https"),
    amocrm = require("./amocrm.js"),
    app = express(),
    request = require("request"),
    parse = require("./parse.js"),
    database = require('./mysql/connection.js');



app.use("/", (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Content-Type", "text/html");
    next();
});

app.use(express.urlencoded());
app.use(express.json());

app.use("/add", (req, res) => {
    let arr = [];
    for (key in req.body){
        arr.push(req.body[key])
    };
    database.insert(arr);
    res.send("done");
});

app.use("/get", (req, res)=>{
    database.get(res);
});


app.listen('2000');

var tags = [];
var rule = [];

amocrm.auth("aagadullin@team.amocrm.com", "df2a6d53d14bc8c187bcab95e7aea5bba5f0e92b", "aagadullin")
    .then(results =>{
        amocrm.getTags(results.cookieForAmocrm)
            .then(result=>{
        tags = result.response['tags'];
        database.get()
            .then(results => {
                rule = results;
                parse.parse(tags, rule)
                    .then((results) =>{
                        console.log(results);
                    })
            })
    })});


