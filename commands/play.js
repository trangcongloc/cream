const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");

const puppeteer = require("puppeteer");
const play = async (connection, message, server, client) => {
    server.dispatcher = connection.play(
        ytdl(server.queue[0], { filter: "audioonly" })
    );
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

module.exports = {
    name: "play",
    description: "Play Music",
    aliases: ["p", "phat"],
    servers: {},
    async execute(client, message, args) {
        const ytRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/g;
        this.servers[message.guild.id] = { queue: [] };
        let server = this.servers[message.guild.id];
        let song;
        if (!message.guild) return;

        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            if (args[0].match(ytRegex)) {
                server.queue.push(args[0]);
            } else {
                const { videos } = await yts(args.join(" "));
                server.queue.push(videos[0].url);
            }
            try {
                play(connection, message, server, song, client);
            } catch (_err) {
                play(connection, message, server, song, client);
            }
        }
    },
};

module.exports.Skip = (connection, message, server) => {
    if (server.dispatcher) {
        server.dispatcher.destroy();
        play(connection, message, server);
    }
};
