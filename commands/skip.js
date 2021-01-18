const playModule = require("./play.js");
module.exports = {
	name: "skip",
	description: "Skip current song",
	interaction: true,
	options: [],
	aliases: [],
	async execute(client, message, args) {
		let server = client.commands.get("play").servers[message.guild.id];
		const connection = await message.member.voice.channel.join();

		playModule.Skip(connection, message, server);
	},
	async ixicute(client, interaction, args) {
		let server = client.commands.get("play").servers[interaction.guild.id];
		const member = interaction.guild.members.cache.get(interaction.member.user.id);

		const connection = await member.voice.channel.join();

		playModule.Skip(connection, interaction, server, client);
	},
};
