module.exports = {

    parse: (tags, rule) => {
        return new Promise((resolve, reject)=> {
            let arrFullRule = [];

            for(i = 0; i < rule.length; i++) {
                for(k = 0; k < tags.length; k++) {
                    if (tags[k]['name'] === rule[i]["rule"]) {
                        let tagsId = tags[k]["id"];
                        let colorRule = rule[i]["color"];
                        arrFullRule[i] = {
                                "id" : tagsId,
                                "color" : colorRule
                            };
                    }
                }

            }
            resolve(arrFullRule);
        })
    }
};