const time = require("../modules/createdTime.js");
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "time",
    description: "Showing Discord Created date/time",
    execute(client, message, args) {
        time.snowflake(message.author.id, () => {
            const attachment = new MessageAttachment("images/snowflake.png");
            message
                .reply(attachment)
                .then((msg) => msg.delete({ timeout: 10000 }));
        });
    },
};
