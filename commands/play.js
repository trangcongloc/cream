const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");

const puppeteer = require("puppeteer");
const play = async (connection, message, server, client) => {
	server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));
	const videos = await ytdl.getInfo(server.queue[0]);
	const video = videos.videoDetails;
	song = {
		url: server.queue[0],
		title: video.title,
		thumbnail: video.thumbnails[video.thumbnails.length - 1].url,
		duration: video.lengthSeconds,
	};
	const songEmbed = new Discord.MessageEmbed()
		.setAuthor("🎶 Auto Playing 🎵")
		.setColor(message.member.displayHexColor)
		.setTitle(song.title)
		.setFooter(message.member.nickname, message.author.avatarURL())
		.setURL(song.url)
		.setImage(song.thumbnail)
		.setTimestamp();

	message.guild.channels.cache
		.get("449181133570179103")
		.send(songEmbed)
		.then((msg) => {
			msg.delete({ timeout: song.duration * 1000 });
		});

	const browser = await puppeteer.launch({
		defaultViewport: null,
	}); // run browser

	const page = await browser.newPage(); // open new tab

	await page.goto(server.queue[0], {
		waitUntil: "networkidle2",
	}); // go to site

	await page.waitForSelector("#thumbnail"); // wait for the selector to load
	const nextURL = await page.evaluate(() => {
		return document.querySelector("#thumbnail").href;
	});

	await browser.close(); // close browser

	server.queue[0] = nextURL;
	server.dispatcher.on("finish", () => {
		if (server.queue[0]) play(connection, message, server);
	});
};
const playInteraction = async (connection, interaction, server, client) => {
	const member = interaction.guild.members.cache.get(interaction.member.user.id);
	const spambotChannel = interaction.guild.channels.cache.get(client.config.guild.channels.spambot);
	server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));
	const videos = await ytdl.getInfo(server.queue[0]);
	const video = videos.videoDetails;
	song = {
		url: server.queue[0],
		title: video.title,
		thumbnail: video.thumbnails[video.thumbnails.length - 1].url,
		duration: video.lengthSeconds,
	};
	const songEmbed = new Discord.MessageEmbed()
		.setAuthor("🎶 Auto Playing 🎵")
		.setColor(member.displayHexColor)
		.setTitle(song.title)
		.setFooter(member.nickname, `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.webp`)
		.setURL(song.url)
		.setImage(song.thumbnail)
		.setTimestamp();

	spambotChannel.send(songEmbed).then((msg) => {
		msg.delete({ timeout: song.duration * 1000 });
	});

	const browser = await puppeteer.launch({
		defaultViewport: null,
	}); // run browser

	const page = await browser.newPage(); // open new tab

	await page.goto(server.queue[0], {
		waitUntil: "networkidle2",
	}); // go to site

	await page.waitForSelector("#thumbnail"); // wait for the selector to load
	const nextURL = await page.evaluate(() => {
		return document.querySelector("#thumbnail").href;
	});

	await browser.close(); // close browser

	server.queue[0] = nextURL;
	server.dispatcher.on("finish", () => {
		if (server.queue[0]) playInteraction(connection, interaction, server, client);
	});
};
module.exports = {
	name: "play",
	description: "Play Music",
	interaction: true,
	options: [{ name: "song", description: "Song name", required: true, type: 3 }],
	aliases: ["p", "phat"],
	servers: {},
	async ixicute(client, interaction, args) {
		const member = interaction.guild.members.cache.get(interaction.member.user.id);
		const ytRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/g;
		this.servers[interaction.guild.id] = { queue: [] };
		let server = this.servers[interaction.guild.id];
		let song;
		if (!interaction.guild) return;

		if (member.voice.channel) {
			const connection = await member.voice.channel.join();
			if (args[0].value.match(ytRegex)) {
				server.queue.push(args[0].value);
			} else {
				const { videos } = await yts(args[0].value);
				server.queue.push(videos[0].url);
			}
			try {
				playInteraction(connection, interaction, server, client);
			} catch (_err) {
				playInteraction(connection, interaction, server, client);
			}
		}
	},
};

module.exports.Skip = (connection, interaction, server, client) => {
	if (server.dispatcher) {
		server.dispatcher.destroy();
		playInteraction(connection, interaction, server, client);
	}
};
