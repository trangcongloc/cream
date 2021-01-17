module.exports = {
	name: "clear",
	description: "Bulk delete",
	aliases: ["clean"],
	execute(client, message, args) {
		if (!message.guild) return;
		if (args[0] < 1 || args[0] > 100) return message.channel.send("Số tin nhắn phải nhiều hơn 0 và ít hơn 100");
		message.channel.bulkDelete(args[0]).then((messages) => {
			message.channel.send(`Đã xóa \`${messages.size}\` tin nhắn tại \`${message.channel.name}\``).then((msg) => msg.delete({ timeout: 3000 }));
		});
	},
};
