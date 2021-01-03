const translate = require("../modules/translate.js");
module.exports = {
    name: "voice",
    description: "Google Translate",
    aliases: ["speak"],
    async execute(client, message, args) {
        translate.soundOfText(args.join(" "), async () => {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play("./voice/voice.mp3");
            } else {
                message
                    .reply(
                        "Không ở trong channel voice voice con cèc" +
                            client.config.emoji.meowtf
                    )
                    .then((msg) => msg.delete({ timeout: 5000 }));
            }
        });
    },
};
