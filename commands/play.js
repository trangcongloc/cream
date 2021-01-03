const yts = require("yt-search");
const ytdl = require("ytdl-core");
const Discord = require("discord.js");

module.exports = {
    name: "play",
    aliases: [],
    description: "play command from music modules",
    async execute(client, message, args) {
        const ytRegexURL = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/gim;
        if (!message.guild) return;
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const { videos } = await yts(args.join(" "));
            console.log(args);
            console.log(videos[0]);
            if (!videos.length)
                return message.channel
                    .send("Tìm bài khác đi :<")
                    .then((msg) => msg.delete({ timeout: 5000 }));
            const song = {
                title: videos[0].title,
                url: videos[0].url,
                description: videos[0].description,
                image: videos[0].image,
                duration: videos[0].duration.timestamp,
            };

            const songInfo = new Discord.MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(song.description)
                .setTitle(song.title)
                .setURL(song.url)
                .setImage(song.image)
                .setTimestamp()
                .setFooter(
                    `⏯️ Duration: ${song.duration}`,
                    client.user.avatarURL()
                );

            const dispatcher = connection.play(
                ytdl(song.url, {
                    filter: "audioonly",
                })
            );
            message.channel
                .send(songInfo)
                .then((msg) => msg.delete({ timeout: 20000 }));
        } else {
            message.reply(
                "Không ở trong Voice Channel thì play con cèc à" +
                    client.config.emoji.meowtf
            );
        }
    },
};
