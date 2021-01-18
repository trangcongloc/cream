const Discord = require("discord.js");

const client = new Discord.Client();
const fs = require("fs");
require("dotenv").config();

const config = require("./config.json");
client.config = config;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

client.login(process.env.DISCORD_TOKEN);

client.once("ready", () => {
	console.log("Cream on Duty");
	for (const file of commandFiles) {
		const commandName = require(`./commands/${file}`);
		client.commands.set(commandName.name, commandName);
		if (commandName.interaction == true) {
			client.api
				.applications(client.user.id)
				.guilds(client.config.guild.id)
				.commands.post({
					data: {
						name: commandName.name,
						description: commandName.description,
						options: commandName.options,
					},
				});
		}
	}

	// ! Test Slash Commands
});

client.ws.on("INTERACTION_CREATE", async (interaction) => {
	const commandName = interaction.data.name.toLowerCase();
	const args = interaction.data.options;
	try {
		const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
		interaction.guild = client.guilds.cache.get(client.config.guild.id);
		command.ixicute(client, interaction, args);

		if (!command) return;
	} catch (_err) {
		console.error("Command Handling error", _err);
	}
});

client.on("message", (message) => {
	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// if (message.content.startsWith(client.config.prefix)) {
	// 	message.delete({ timeout: 1500 });

	// 	try {
	// 		const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
	// 		command.execute(client, message, args);

	// 		if (!command) return;
	// 	} catch (_err) {
	// 		message.channel.send("Không có lệnh đấy", client.config.emoji.meowtf).then((msg) => msg.delete({ timeout: 1500 }));
	// 	}
	// }
	// Specific message
	if (message.content == "<@!765432728052563989>") {
		message.reply("tag con cằc" + client.config.emoji.goose);
	}
	// Specific Channel code
	switch (message.channel.id) {
		case client.config.channels.confession:
			// webhooks
			const webhookClient = new Discord.WebhookClient(client.config.webhooks.confession.id, client.config.webhooks.confession.token);

			message.delete({ timeout: 0 });
			const cfsChannel = message.guild.channels.cache.get(client.config.channels.general);
			webhookClient.send(message.content);
	}
});

// console uncaught error
process.on("uncaughtException", (_err, origin) => {
	console.error(_err);
});
