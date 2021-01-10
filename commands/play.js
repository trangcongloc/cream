const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");

const puppeteer = require("puppeteer");
const play = async (connection, message, server) => {
    server.dispatcher = connection.play(
        ytdl(server.queue[0], { filter: "audioonly" })
    );

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
        else message.channel.send("err");
    });
};

module.exports = {
    name: "play",
    description: "Play Music",
    aliases: [],
    servers: {},
    async execute(client, message, args) {
        this.servers[message.guild.id] = { queue: [] };
        let server = this.servers[message.guild.id];
        if (!message.guild) return;
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            server.queue.push(args[0]);
            play(connection, message, server);
            console.log(server);
        }
    },
};

module.exports.Skip = () => {
    if (server.dispatcher) {
        server.dispatcher.destroy();
        play(connection, message, server, etc.play);
    }
};
