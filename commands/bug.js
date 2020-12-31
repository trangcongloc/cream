module.exports = {
    name: "bug",
    description: "Hành hình",
    execute(client, message, args) {
        const target = message.mentions.members.first();
        const exePerm = message.member.roles.cache.find(
            (r) => r.name.toLowerCase() == "đao phủ"
        );
        const bugRole = message.guild.roles.cache.find(
            (r) => r.name.toLowerCase() == "bug"
        );
        if (target == undefined) {
            message
                .reply(
                    "Hành hình ai thì phải nêu rõ tên nó ra" +
                        client.config.emoji.meowtf
                )
                .then((msg) => msg.delete({ timeout: 5000 }));
            return;
        }

        if (exePerm == undefined) {
            message
                .reply(
                    "Đ' có role <@&778747259918745621> đòi hành hình người khác?" +
                        client.config.emoji.meowtf
                )
                .then((msg) => msg.delete({ timeout: 5000 }));
            return;
        }

        if (bugRole == undefined) {
            message.reply(
                "Server phải có role `bug` mới có thể dùng được lệnh"
            );
        }
        target.roles.add(bugRole);
        target.voice.setMute(true);
        message
            .reply(`Đã bug ${target}\n> ⏰ Cooldown: 5 phút`)
            .then((msg) => msg.delete({ timeout: 5000 }));
        setTimeout(() => {
            target.roles.remove(bugRole);
            target.voice.setMute(false);
        }, 300000);
    },
};
