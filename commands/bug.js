module.exports = {
	name: "bug",
	description: "Hành hình",
	interaction: true,
	options: [
		{ name: "user", description: "User to Exodia", required: true, type: 6 },
		{ name: "time", description: "Timeout", required: true, type: 4 },
	],
	aliases: ["exodia"],
	ixicute(client, interaction, args) {
		let dt = new Date();
		let gmtdt = dt.toLocaleString("en-US", { timeZone: "GMT" });
		let gmt7dt = new Date(new Date(gmtdt).getTime() + 7 * 3600000);
		let finalTime = new Date(gmt7dt.getTime() + args[1].value * 60000);
		const botlogChannel = interaction.guild.channels.cache.get(client.config.guild.channels.botlog);
		const channel = interaction.guild.channels.cache.get(interaction.channel_id);
		const target = interaction.guild.members.cache.get(args[0].value);
		const exePerm = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() == "đao phủ");
		const bugRole = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() == "bug");
		if (!interaction.member.roles.includes(exePerm.id)) {
			channel.send("Đ' có role <@&778747259918745621> đòi hành hình người khác?" + client.config.emoji.meowtf).then((msg) => msg.delete({ timeout: 5000 }));
			return;
		}

		if (bugRole == undefined) {
			channel.send("Server phải có role `bug` mới có thể dùng được lệnh");
		}

		target.roles.add(bugRole);
		target.voice.setMute(true);
		channel.send(`Đã xóa đi tư cách làm người của ${target} trong ${args[1].value} phút\n> 🔪 Đao phủ: <@${interaction.member.user.id}>\n> ⏰ Timeout: ${finalTime.toLocaleString("vi-VN")}`);
		setTimeout(() => {
			target.roles.remove(bugRole);
			target.voice.setMute(false);
		}, args[1].value * 60000);
	},
};
