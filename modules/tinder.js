const request = require("request");

module.exports = {
	core: async (token, callback) => {
		const options = {
			url: "https://api.gotinder.com/v2/recs/core?locale=vi",
			headers: {
				"x-auth-token": token,
			},
		};
		request(options, (_err, response, body) => {
			const info = JSON.parse(body);
			callback(info);
		});
	},
	info: async (tinderID, token, callback) => {
		const options = {
			url: `https://api.gotinder.com/user/${tinderID}?locale=vi`,
			headers: {
				"x-auth-token": token,
				"accept-language": "vi",
			},
		};
		request(options, (_err, response, body) => {
			const info = JSON.parse(body);
			callback(info);
		});
	},
	like: async (tinderID, token, callback) => {
		// Like profile
		const options = {
			url: `https://api.gotinder.com/like/${tinderID}`,
			headers: {
				"x-auth-token": process.env.TINDER_TOKEN,
			},
		};

		request(options, (_err, response, body) => {
			const data = JSON.parse(body);
			callback(data);
		});
	},
	dislike: async (tinderID, token, callback) => {
		// Like profile
		const options = {
			url: `https://api.gotinder.com/pass/${tinderID}`,
			headers: {
				"x-auth-token": process.env.TINDER_TOKEN,
			},
		};

		request(options, (_err, response, body) => {
			const data = JSON.parse(body);
			callback(data);
		});
	},
};
