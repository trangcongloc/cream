module.exports = {
    name: "eval",
    description: "running Eval",
    aliases: ["run"],
    execute(client, message, args) {
        eval(args[0]);
    },
};
