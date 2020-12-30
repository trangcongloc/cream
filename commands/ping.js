module.exports = {
    name: "ping",
    description: "Just .... ping",
    usage: "",
    execute(client, message, args) {
        message.reply("ping con cặc" + client.config.emoji.goose);
    },
};
