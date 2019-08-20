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

var tags = [];
var rule = [];

app.use(express.urlencoded());
app.use(express.json());

app.use("/connect", (req,res)=>{
    let arr =[];
    for (key in req.body){
        arr.push(req.body[key])
    }
    database.get("users").then(result =>{
        if (result.length === 0) {
            database.insertAccount(arr);
        } else {
            for (let i = 0; i < result.length; i++){
                for (let key in result[i]){
                    if (key === "account_id" && result[i][key] !== arr[0]) {
                        database.insertAccount(arr);
                    }
                }
            }
        }
    })
});


app.use("/add", (req, res) => {
    database.get("color_tags").then((result)=>{
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
            database.insertRule(arr)
        }
        database.get("color_tags").then((result)=>{
            res.send(result);
        })
    })
});

app.use("/get", (req, res)=>{
    console.log(req.body);
    amocrm.auth(req.body.login, req.body.api_key, req.body.subdomain)
        .then(results =>{
            amocrm.getTags(results.cookieForAmocrm)
                .then(result=>{
                    tags = result.response['tags'];
                    database.get("color_tags")
                        .then(results => {
                            rule = results;
                            parse.parse(tags, rule)
                                .then((results) =>{
                                    res.send(results);
                                })
                        })
                })
        });
});

app.use("/getrule", (req, res)=> {
  database.get('color_tags').then(resolve =>{
      res.send(resolve);
  })
});

app.use('/delete', (req, res)=> {
    database.delete(req.body.rule).then(result=>{
            database.get("color_tags").then(result=>{
                res.send(result);
            })
    })
});

app.listen('2000');





