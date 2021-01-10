const playModule = require("./play.js");
module.exports = {
    name: "skip",
    description: "Skip song",
    async execute(client, message, args) {
        playModule.Skip();
    },
};
