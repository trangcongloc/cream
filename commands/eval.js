module.exports = {
	name: "eval",
	description: "running Eval",
	interaction: true,
	options: [
		{
			name: "code",
			description: "Block of Code to run",
			required: true,
			type: 3,
		},
	],
	aliases: ["run"],
	execute(client, message, args) {
		if (message.author.id != "207901163419467776") return;
		eval(args[0]);
	},
	ixicute(client, interaction, args, inter) {
		if (interaction.member.user.id != "207901163419467776") return;
		eval(args[0].value);
	},
};
