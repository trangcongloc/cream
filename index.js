const Discord = require("discord.js");

const client = new Discord.Client();
const fs = require("fs");
require("dotenv").config();

const config = require("./config.json");
client.config = config;

client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

client.login(process.env.DISCORD_TOKEN);

for (const file of commandFiles) {
    const commandName = require(`./commands/${file}`);
    client.commands.set(commandName.name, commandName);
}
client.once("ready", () => {
    console.log("Hello there");
});

client.on("message", (message) => {
    console.log(message.content);
    // Default Command handling
    const args = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (message.content.startsWith(client.config.prefix)) {
        message.delete({ timeout: 1500 });
        if (!client.commands.has(commandName)) return;

        try {
            client.commands.get(commandName).execute(client, message, args);
        } catch (_err) {
            console.error(_err);
        }
    }
    // Specific message
    if (message.content == "<@!765432728052563989>") {
        message.reply("tag con cằc" + client.config.emoji.goose);
    }
    // Specific Channel code
    switch (message.channel.id) {
        case client.config.channels.confession:
            message.delete({ timeout: 0 });
            const cfsChannel = message.guild.channels.cache.get(
                client.config.channels.general
            );
            cfsChannel.send(message.content);
    }
});

// console uncaught error
process.on("uncaughtException", (_err, origin) => {
    console.log("UNCAUGHT ERROR");
    console.error(_err);
});
