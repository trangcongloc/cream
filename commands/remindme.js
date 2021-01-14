const remindme = (content, timeout, server, message) => {
    server.push({ author: message.author.id, content: content });
    let dt = new Date();
    let gmtdt = dt.toLocaleString("en-US", { timeZone: "GMT" });
    let gmt7dt = new Date(new Date(gmtdt).getTime() + 7 * 3600000);
    let finalTime = new Date(gmt7dt.getTime() + timeout * 1000);

    message.channel
        .send(
            `Đã đặt nhắc nhở cho <@${
                message.author.id
            }>\n> 📝 Nội dung: \`${content}\`\n> ⏰ Vào lúc: \`${finalTime.toLocaleString(
                "en-US"
            )}\``
        )
        .then((msg) => msg.delete({ timeout: 10000 }));
    setTimeout(() => {
        server.shift();
        message.guild.channels.cache
            .get("799404952115609642")
            .send(
                `<@${
                    message.author.id
                }>, Nhắc nhở từ lúc \`${gmt7dt.toLocaleString(
                    "en-US"
                )}\`\n > 📝 Nội dung: \`${content}\``
            );
    }, timeout * 1000);
};

module.exports = {
    name: "remindme",
    description: "remind me?",
    servers: {},
    aliases: ["remind", "rm"],
    execute(client, message, args) {
        this.servers[message.channel.id] = [];
        let server = this.servers[message.channel.id];
        if (parseInt(args[args.length - 1]) == NaN) {
            message.channel
                .send(
                    "Phải đặt thời gian nữa <:meowtf:779168833129807893>\n > `/remindme` + `nội dung` + `thời gian(giây)`"
                )
                .then((msg) => msg.delete({ timeout: 5000 }));
        } else {
            remindme(
                args
                    .join(" ")
                    .slice(
                        0,
                        args.join(" ").length - args[args.length - 1].length - 1
                    ),
                args[args.length - 1],
                server,
                message
            );
        }
    },
};
