const Discord = require("discord.js");

const client = new Discord.Client();
const fs = require("fs");
require("dotenv").config();

const config = require("./config.json");
client.config = config;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

client.login(process.env.DISCORD_TOKEN);

for (const file of commandFiles) {
	const commandName = require(`./commands/${file}`);
	client.commands.set(commandName.name, commandName);
}
client.once("ready", () => {
	console.log("Cream on Duty");
});

client.on("message", (message) => {
	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (message.content.startsWith(client.config.prefix)) {
		message.delete({ timeout: 1500 });

		try {
			const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
			command.execute(client, message, args);

			if (!command) return;
		} catch (_err) {
			message.channel.send("Không có lệnh đấy", client.config.emoji.meowtf).then((msg) => msg.delete({ timeout: 1500 }));
		}
	}
	// Specific message
	if (message.content == "<@!765432728052563989>") {
		message.reply("tag con cằc" + client.config.emoji.goose);
	}
	// Specific Channel code
	switch (message.channel.id) {
		case client.config.channels.confession:
			message.delete({ timeout: 0 });
			const cfsChannel = message.guild.channels.cache.get(client.config.channels.general);
			cfsChannel.send(message.content);
	}
});

// console uncaught error
process.on("uncaughtException", (_err, origin) => {
	console.error(_err);
});
