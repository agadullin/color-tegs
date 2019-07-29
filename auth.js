const https = require('https');


module.exports = {
   auth: function (user_login, user_hash, subdomain) {
    return new Promise((resolve, reject) => {
        var body = {
            USER_LOGIN: user_login,
            USER_HASH: user_hash
        };

        var cookieAmocrm =[];

        body = JSON.stringify(body);

        var options = {
            host: subdomain + ".amocrm.ru",
            path: "/private/api/auth.php?type=json",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        var request = https.request(options, (res) => {

            res.on('data', (data) =>{

                var responseObj = JSON.parse(data);

                if (res.statusCode === 200) {
                    cookieAmocrm = res.headers['set-cookie'];
                    return resolve({responseObj:responseObj,
                                     cookieForAmocrm: cookieAmocrm});
                } else {
                    return reject(responseObj);
                }
            })
        });
        request.write(body);
        request.end();
    })
}};

