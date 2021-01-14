const tinder = require("../modules/tinder.js");
require("dotenv").config();
const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "tinder",
    description: "Tinder Image",
    aliases: ["td"],
    execute(client, message, args) {
        tinder.core(process.env.TINDER_TOKEN, (info) => {
            switch (info.meta.status) {
                case 200:
                    console.log();
                    const user =
                        info.data.results[
                            Math.floor(
                                Math.random() * (info.data.results.length - 1)
                            )
                        ].user;

                    // // remove from recommend
                    // const options = {
                    //     url: `https://api.gotinder.com/pass/${user._id}`,
                    //     headers: {
                    //         "x-auth-token": process.env.TINDER_TOKEN,
                    //     },
                    // };

                    // request(passUrl, (_err, response, body) => {
                    //     console.log(JSON.parse(body).status);
                    // });

                    const tinderEmbed = new Discord.MessageEmbed()
                        .setColor(message.member.displayHexColor)
                        .setTitle(
                            `🌟 ${user.name} | ${user.birth_date.slice(0, 4)}`
                        )
                        .setAuthor(
                            message.member.nickname,
                            message.author.avatarURL()
                        )
                        .setDescription(user.bio)
                        .setImage(user.photos[0].url)
                        .setTimestamp()
                        .setFooter(user._id, user.photos[0].url);

                    message.channel
                        .send(tinderEmbed)
                        .then((msg) => msg.delete({ timeout: 20000 }));
            }
        });
    },
};
