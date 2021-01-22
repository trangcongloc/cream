const time = require("../modules/etc.js");
const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "time",
	description: "When did you create your Discord Account?",
	interaction: true,
	options: [
		{
			name: "user",
			description: "Check other user Snowflake time",
			required: false,
			type: 6,
		},
	],
	aliases: ["created"],
	ixicute(client, interaction, args) {
		const channel = interaction.guild.channels.cache.get(interaction.channel_id);
		const generalChannel = interaction.guild.channels.cache.get(client.config.guild.channels.general);
		if (args) {
			time.snowflake(args[0].value, () => {
				const attachment = new MessageAttachment("images/snowflake.png");
				channel.send(attachment).then((msg) => msg.delete({ timeout: 10000 }));
			});
		} else {
			time.snowflake(interaction.member.user.id, () => {
				const attachment = new MessageAttachment("images/snowflake.png");
				channel.send(attachment).then((msg) => msg.delete({ timeout: 10000 }));
			});
		}
	},
};
