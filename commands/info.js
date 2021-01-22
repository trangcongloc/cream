const tinder = require("../modules/tinder.js");
const Discord = require("discord.js");

require("dotenv").config();
module.exports = {
	name: "info",
	description: "Get Tinder Info",
	interaction: true,
	options: [
		{
			name: "tinderID",
			description: "Tinder ID để tìm info",
			required: true,
			type: 3,
		},
	],
	ixicute(client, interaction, args) {
		const channel = interaction.guild.channels.cache.get(interaction.channel_id);
		const generalChannel = interaction.guild.channels.cache.get(client.config.guild.channels.general);
		const member = interaction.guild.members.cache.get(interaction.member.user.id);
		if (!args[0].value) {
			channel.send("Đưa cái ID Tinder đây " + client.config.emoji.meowtf).then((msg) => msg.delete({ timeout: 3000 }));
		} else {
			tinder.info(args[0].value, process.env.TINDER_TOKEN, (info) => {
				const user = info.results;

				// school
				const userSchool = user.schools.length != 0 ? user.schools[0].name : " ¯\\_(ツ)_/¯";

				// workplace
				const userJob = user.jobs.length != 0 ? user.jobs[0].name : " ¯\\_(ツ)_/¯";

				// Location
				const userLocation = user.city == undefined ? "(っ °Д °;)っ đâu đó cách đây" : `Tại ${user.city.name} cách đây`;

				// interets
				let interests;
				let interests_string = "";

				const userName = user.badges != [] ? `✅ ${user.name}` : user.name;
				if (user.user_interests == undefined) {
					interests_string = " ¯\\_(ツ)_/¯";
				} else {
					interests = user.user_interests.selected_interests;
					interests.forEach((i) => {
						interests_string += `- ${i.name}\n`;
					});
				}

				const tinderEmbed = new Discord.MessageEmbed()
					.setColor(member.displayHexColor)
					.setTitle(`${userName} - ${user.birth_date.slice(0, 4)}`)
					.setAuthor(
						`${userLocation} ${Math.ceil(user.distance_mi * 1.6)} km`,
						"https://www.pinclipart.com/picdir/big/363-3639653_location-pin-transparent-location-logo-png-vector-clipart.png"
					)
					.addFields(
						{
							name: "😍 Sở thích",
							value: interests_string,
							inline: true,
						},
						{
							name: "🏫 Học tại",
							value: userSchool,
							inline: true,
						},
						{
							name: "💼 Làm việc tại",
							value: userJob,
							inline: true,
						}
					)
					.setDescription(user.bio)
					.setImage(user.photos[0].url)
					.setTimestamp()
					.setFooter(user._id, client.user.avatarURL());

				channel.send(tinderEmbed).then((msg) => {
					msg.react("❌");
					const filter = (reaction, user) => {
						return ["❌"].includes(reaction.emoji.name) && user.id === interaction.member.user.id;
					};

					msg.awaitReactions(filter, {
						max: 1,
						time: 20000,
						errors: ["time"],
					})
						.then((collected) => {
							const reaction = collected.first();

							if (reaction.emoji.name === "❌") {
								msg.delete({ timeout: 100 });
							}
						})
						.catch((collected) => {
							msg.delete({ timeout: 10000 });
						});
				});
			});
		}
	},
};
