module.exports = {
	name: "join",
	description: "Join Voice Channel",
	aliases: ["cream"],
	async execute(client, message, args) {
		if (!message.guild) return;
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
		} else {
			message.reply("Không ở trong Voice Channel thì join con cèc à" + client.config.emoji.meowtf);
		}
	},
};
