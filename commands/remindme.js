const remindme = (content, timeout, message) => {
	let dt = new Date();
	let gmtdt = dt.toLocaleString("en-US", { timeZone: "GMT" });
	let gmt7dt = new Date(new Date(gmtdt).getTime() + 7 * 3600000);
	let finalTime = new Date(gmt7dt.getTime() + timeout * 60000);

	message.channel
		.send(`Đã đặt nhắc nhở cho <@${message.author.id}>\n> 📝 Nội dung: \`${content}\`\n> ⏰ Vào lúc: \`${finalTime.toLocaleString("en-US")}\``)
		.then((msg) => msg.delete({ timeout: 10000 }));
	setTimeout(() => {
		message.guild.channels.cache.get("799404952115609642").send(`<@${message.author.id}>, Nhắc nhở từ lúc \`${gmt7dt.toLocaleString("en-US")}\`\n > 📝 Nội dung: \`${content}\``);
	}, timeout * 60000);
};

const remindmeInteraction = (content, timeout, interaction, client) => {
	const channel = interaction.guild.channels.cache.get(interaction.channel_id);
	const generalChannel = interaction.guild.channels.cache.get(client.config.guild.channels.general);
	const remindmeChannel = interaction.guild.channels.cache.get(client.config.guild.channels.remindme);
	const member = interaction.guild.members.cache.get(interaction.member.user.id);

	let dt = new Date();
	let gmtdt = dt.toLocaleString("en-US", { timeZone: "GMT" });
	let gmt7dt = new Date(new Date(gmtdt).getTime() + 7 * 3600000);
	let finalTime = new Date(gmt7dt.getTime() + timeout * 60000);

	channel.send(`Đã đặt nhắc nhở cho <@${interaction.member.user.id}>\n> 📝 Nội dung: \`${content}\`\n> ⏰ Vào lúc: \`${finalTime.toLocaleString("vi-VN")}\``);
	setTimeout(() => {
		member.send(`<@${interaction.member.user.id}>, Nhắc nhở từ lúc \`${gmt7dt.toLocaleString("vi-VN")}\`\n > 📝 Nội dung: \`${content}\``);
	}, timeout * 60000);
};

module.exports = {
	name: "remindme",
	description: "remind me?",
	interaction: true,
	options: [
		{
			name: "content",
			description: "Content so bot can remind",
			required: true,
			type: 3,
		},
		{
			name: "time",
			description: "Time to remind in minute(s)",
			required: true,
			type: 4,
		},
	],
	aliases: ["remind", "rm"],
	ixicute(client, interaction, args) {
		remindmeInteraction(args[0].value, args[1].value, interaction, client);
	},
};
