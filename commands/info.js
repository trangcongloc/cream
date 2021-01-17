const tinder = require("../modules/tinder.js");
const Discord = require("discord.js");

require("dotenv").config();
module.exports = {
	name: "info",
	description: "Get Tinder Info",
	execute(client, message, args) {
		if (!args[0]) {
			message.channel.send("Đưa cái ID Tinder đây " + client.config.emoji.meowtf).then((msg) => msg.delete({ timeout: 3000 }));
		} else {
			tinder.info(args[0], process.env.TINDER_TOKEN, (info) => {
				console.log(info);
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
					.setColor(message.member.displayHexColor)
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
					.setFooter(user._id, message.author.avatarURL());

				message.channel.send(tinderEmbed).then((msg) => msg.delete({ timeout: 20000 }));
			});
		}
	},
};
