const request = require("request");

module.exports = {
    core: async (token, callback) => {
        const options = {
            url: "https://api.gotinder.com/v2/recs/core?locale=en",
            headers: {
                "x-auth-token": token,
            },
        };
        request(options, (_err, response, body) => {
            const info = JSON.parse(body);
            callback(info);
        });
    },
};
