const express = require('express'),
    app = express(),
    mysql = require('mysql2');



app.use("/", (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.urlencoded());
app.use(express.json());

app.use("/add", (req, res) => {
    console.log(req.body);
})


app.listen('2000');