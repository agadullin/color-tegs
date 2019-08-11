const express = require('express'),
    amocrm = require("./amocrm.js"),
    app = express(),
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

app.use("/connect", (req,res)=>{
    let arr =[];
    for (key in req.body){
        arr.push(req.body[key])
    }
    database.connect(arr);
});


app.use("/add", (req, res) => {
    database.get().then((result)=>{
        let arr = [];
        let arrRule = [];
        for (let i = 0; i < result.length; i++) {
            for (value in result[i]){
                if(value === "rule") {
                    arrRule.push(result[i]["rule"]);
                }
            }
        }
        if (arrRule.indexOf(req.body.rule) === -1) {
            for (key in req.body){
                arr.push(req.body[key])
            }
            database.insert(arr)
        }
    })
});

app.use("/get", (req, res)=>{
    //database.get(res);
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
                                    res.send(results);
                                })
                        })
                })});
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


