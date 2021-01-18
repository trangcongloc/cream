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
	execute(client, message, args) {
		time.snowflake(message.author.id, () => {
			const attachment = new MessageAttachment("images/snowflake.png");
			message.reply(attachment).then((msg) => msg.delete({ timeout: 10000 }));
		});
	},
	ixicute(client, interaction, args) {
		const generalChannel = interaction.guild.channels.cache.get(client.config.guild.channels.general);
		if (args) {
			time.snowflake(args[0].value, () => {
				const attachment = new MessageAttachment("images/snowflake.png");
				generalChannel.send(attachment).then((msg) => msg.delete({ timeout: 10000 }));
			});
		} else {
			time.snowflake(interaction.member.user.id, () => {
				const attachment = new MessageAttachment("images/snowflake.png");
				generalChannel.send(attachment).then((msg) => msg.delete({ timeout: 10000 }));
			});
		}
	},
};
