module.exports = {
	name: "bug",
	description: "Hành hình",
	interaction: true,
	options: [
		{ name: "user", description: "User to Exodia", required: true, type: 6 },
		{ name: "time", description: "Timeout", required: true, type: 4 },
	],
	aliases: ["exodia"],
	execute(client, message, args) {
		const target = message.mentions.members.first();
		const exePerm = message.member.roles.cache.find((r) => r.name.toLowerCase() == "đao phủ");
		const bugRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() == "bug");
		if (target == undefined) {
			message.reply("Hành hình ai thì phải nêu rõ tên nó ra" + client.config.emoji.meowtf).then((msg) => msg.delete({ timeout: 5000 }));
			return;
		}

		if (exePerm == undefined) {
			message.reply("Đ' có role <@&778747259918745621> đòi hành hình người khác?" + client.config.emoji.meowtf).then((msg) => msg.delete({ timeout: 5000 }));
			return;
		}

		if (bugRole == undefined) {
			message.reply("Server phải có role `bug` mới có thể dùng được lệnh");
		}
		target.roles.add(bugRole);
		target.voice.setMute(true);
		message.reply(`Đã bug ${target}\n> ⏰ Cooldown: 5 phút`).then((msg) => msg.delete({ timeout: 5000 }));
		setTimeout(() => {
			target.roles.remove(bugRole);
			target.voice.setMute(false);
		}, 300000);
	},
	ixicute(client, interaction, args) {
		let dt = new Date();
		let gmtdt = dt.toLocaleString("en-US", { timeZone: "GMT" });
		let gmt7dt = new Date(new Date(gmtdt).getTime() + 7 * 3600000);
		let finalTime = new Date(gmt7dt.getTime() + args[1].value * 60000);
		const botlogChannel = interaction.guild.channels.cache.get(client.config.guild.channels.botlog);
		const target = interaction.guild.members.cache.get(args[0].value);
		const exePerm = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() == "đao phủ");
		const bugRole = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() == "bug");
		target.roles.add(bugRole);
		target.voice.setMute(true);
		botlogChannel.send(`Đã xóa đi tư cách làm người của ${target} trong ${args[1].value} phút\n> 🔪 Đao phủ: <@${interaction.member.user.id}>\n> ⏰ Timeout: ${finalTime.toLocaleString("vi-VN")}`);
		setTimeout(() => {
			target.roles.remove(bugRole);
			target.voice.setMute(false);
		}, args[1].value * 60000);
	},
};
