module.exports = {
	name: "ping",
	description: "Just .... ping",
	aliases: [""],
	execute(client, message, args) {
		message.reply("ping con cặc" + client.config.emoji.goose);
	},
};
