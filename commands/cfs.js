const Discord = require("discord.js");
module.exports = {
	name: "cfs",
	description: "Say something anonymous",
	interaction: true,
	options: [
		{
			name: "content",
			description: "Do you have anything to say? anonymous?",
			required: true,
			type: 3,
		},
	],
	aliases: [],
	ixicute(client, interaction, args) {
		const channel = interaction.guild.channels.cache.get(interaction.channel_id);
		const webhookClient = new Discord.WebhookClient(client.config.webhooks.confession.id, client.config.webhooks.confession.token);

		webhookClient.send(args[0].value);
	},
};
