const playModule = require("./play.js");
module.exports = {
	name: "skip",
	description: "Skip song",
	async execute(client, message, args) {
		let server = client.commands.get("play").servers[message.guild.id];
		const connection = await message.member.voice.channel.join();

		playModule.Skip(connection, message, server);
	},
};
