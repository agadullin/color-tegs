const mysql = require('mysql2');



const connection  = mysql.createConnection({
            host: "localhost",
            user: "amocrm",
            database: "COLOR_TAGS",
            password: "Anna!999",
            insecureAuth: true
        });

/*const databasase = {

    insert : (arr) => {
            let sql = "INSERT INTO color_tags (rule, color, subdomain) VALUES (?, ?, ?)";
            connection.query(sql, arr, (err, res) =>{
                if (err) console.log(err);
            })
    },

    get: (responce) => {
        let sql = "SELECT * FROM color_tags";
        connection.query(sql, (err, res)=>{
            responce.send(res);
        })
    }

};*/

const base = {

    insertAccount: (arr) => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO users (account_id, login, api_key, subdomain) VALUES (?, ?, ? ,?)";
            connection.query(sql, arr, (err, res) => {
                if (err){
                    console.log(err);
                }
                resolve(res);
            })
        })
    },

    get: (table_name) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM " + table_name;
            connection.query(sql, (err, res) =>{
                if (err){
                    console.log(err);
                }
               resolve(res);
            })
        })
    },

    insertRule : (arr) => {
        let sql = "INSERT INTO color_tags (rule, color, subdomain) VALUES (?, ?, ?)";
        connection.query(sql, arr, (err, res) =>{
            if (err) console.log(err);
        })
    },

};

module.exports = base;