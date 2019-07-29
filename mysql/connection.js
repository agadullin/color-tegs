const mysql = require('mysql2');



const connection  = mysql.createConnection({
            host: "localhost",
            user: "amocrm",
            database: "COLOR_TAGS",
            password: "Anna!999",
            insecureAuth: true
        });

const databasase = {

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

};

module.exports = databasase;