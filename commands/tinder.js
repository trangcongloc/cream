const tinder = require("../modules/tinder.js");
require("dotenv").config();
const Discord = require("discord.js");

module.exports = {
	name: "tinder",
	description: "Bro you want some info?",
	interaction: true,
	options: [],
	aliases: ["td"],
	execute(client, message, args) {
		tinder.core(process.env.TINDER_TOKEN, (info) => {
			switch (info.meta.status) {
				case 200:
					const profile = info.data.results[Math.floor(Math.random() * (info.data.results.length - 1))];
					const user = profile.user;
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
					if (profile.experiment_info == undefined) {
						interests_string = " ¯\\_(ツ)_/¯";
					} else {
						interests = profile.experiment_info.user_interests.selected_interests;
						interests.forEach((i) => {
							interests_string += `- ${i.name}\n`;
						});
					}
					const tinderEmbed = new Discord.MessageEmbed()
						.setColor(message.member.displayHexColor)
						.setTitle(`${userName} - ${user.birth_date.slice(0, 4)}`)
						.setAuthor(
							`${userLocation} ${Math.ceil(profile.distance_mi * 1.6)} km`,
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

					message.channel.send(tinderEmbed).then((msg) => {
						msg.react("👍").then(() => msg.react("👎"));
						const filter = (reaction, user) => {
							return ["👍", "👎"].includes(reaction.emoji.name) && user.id === message.author.id;
						};

						msg.awaitReactions(filter, {
							max: 1,
							time: 60000,
							errors: ["time"],
						})
							.then((collected) => {
								const reaction = collected.first();

								if (reaction.emoji.name === "👍") {
									tinder.like(user._id, process.env.TINDER_TOKEN, (data) => {
										// console.log(data);
									});
									msg.reactions.removeAll().catch((_err) => console.error("Failed to clear reactions", _err));
									message.reply(`Đã Like ${user.name} 😍`).then((msg) => {
										msg.delete({ timeout: 5000 });
									});
									msg.delete({ timeout: 5000 });
								} else {
									tinder.dislike(user._id, process.env.TINDER_TOKEN, (data) => {
										// console.log(data);
									});
									msg.reactions.removeAll().catch((_err) => console.error("Failed to clear reactions", _err));
									message.reply(`Đã Dislike ${user.name} 😢`).then((msg) => {
										msg.delete({ timeout: 5000 });
									});
									msg.delete({ timeout: 5000 });
								}
							})
							.catch((collected) => {
								// console.log("no one Like/Dislike?");
								msg.delete({ timeout: 1000 });
							});
					});
			}
		});
	},

	ixicute(client, interaction, args) {
		const channel = interaction.guild.channels.cache.get(interaction.channel_id);
		const tinderProfileChannel = interaction.guild.channels.cache.get(client.config.guild.channels.tinderprofile);
		const member = interaction.guild.members.cache.get(interaction.member.user.id);
		tinder.core(process.env.TINDER_TOKEN, (info) => {
			switch (info.meta.status) {
				case 200:
					const profile = info.data.results[Math.floor(Math.random() * (info.data.results.length - 1))];
					const user = profile.user;
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
					if (profile.experiment_info == undefined) {
						interests_string = " ¯\\_(ツ)_/¯";
					} else {
						interests = profile.experiment_info.user_interests.selected_interests;
						interests.forEach((i) => {
							interests_string += `- ${i.name}\n`;
						});
					}
					const tinderEmbed = new Discord.MessageEmbed()
						.setColor(member.displayHexColor)
						.setTitle(`${userName} - ${user.birth_date.slice(0, 4)}`)
						.setAuthor(
							`${userLocation} ${Math.ceil(profile.distance_mi * 1.6)} km`,
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
						msg.react("👍").then(() => msg.react("👎").then(() => msg.react("👼")));
						const filter = (reaction, user) => {
							return ["👍", "👎", "👼"].includes(reaction.emoji.name) && user.id === interaction.member.user.id;
						};

						msg.awaitReactions(filter, {
							max: 1,
							time: 60000,
							errors: ["time"],
						})
							.then((collected) => {
								const reaction = collected.first();

								if (reaction.emoji.name === "👍") {
									tinder.like(user._id, process.env.TINDER_TOKEN, (data) => {
										// console.log(data);
									});
									msg.reactions.removeAll().catch((_err) => console.error("Failed to clear reactions", _err));
									channel.send(`<@${interaction.member.user.id}> Đã Like ${user.name} 😍`).then((msg) => {
										msg.delete({ timeout: 5000 });
									});
									msg.delete({ timeout: 5000 });
								} else if (reaction.emoji.name === "") {
									tinder.dislike(user._id, process.env.TINDER_TOKEN, (data) => {
										// console.log(data);
									});
									msg.reactions.removeAll().catch((_err) => console.error("Failed to clear reactions", _err));
									channel.send(`<@${interaction.member.user.id}> Đã Dislike ${user.name} 😢`).then((msg) => {
										msg.delete({ timeout: 5000 });
									});
									msg.delete({ timeout: 5000 });
								} else if (reaction.emoji.name === "👼") {
									tinderProfileChannel.send(tinderEmbed);
									channel.send(`<@${interaction.member.user.id}> Đã save profile ${user.name} 👼 tại <#${client.config.guild.channels.tinderprofile}>`).then((msg) => {
										msg.delete({ timeout: 5000 });
									});

									msg.delete({ timeout: 5000 });
								}
							})
							.catch((collected) => {
								// console.log("no one Like/Dislike?");
								msg.delete({ timeout: 1000 });
							});
					});
			}
		});
	},
};
