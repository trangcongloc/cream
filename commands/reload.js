module.exports = {
	name: "reload",
	description: "Reloads a command",
	interaction: true,
	options: [
		{
			name: "command",
			description: " Stash commands to reload",
			required: true,
			type: 3,
		},
	],
	aliases: [],
	ixicute(client, interaction, args) {
		const commandName = args[0].value.toLowerCase();
		const channel = interaction.guild.channels.cache.get(interaction.channel_id);
		const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return channel.send(`There is no command with name or alias \`${commandName}\`!`).then((msg) => msg.delete({ timeout: 3000 }));
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			client.commands.set(newCommand.name, newCommand);
			channel.send(`Command \`${command.name}\` was reloaded!`).then((msg) => msg.delete({ timeout: 3000 }));
			client.api
				.applications(client.user.id)
				.guilds(client.config.guild.id)
				.commands.post({
					data: {
						name: newCommand.name,
						description: newCommand.description,
						options: newCommand.options,
					},
				});
		} catch (error) {
			console.error(error);
			channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``).then((msg) => msg.delete({ timeout: 3000 }));
		}
	},
};
