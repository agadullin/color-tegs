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
            let sql = "INSERT INTO color_tags (rule, color) VALUES (?, ?)";
            connection.query(sql, arr, (err, res) =>{
                if (err) console.log(err);
            })
    },


}