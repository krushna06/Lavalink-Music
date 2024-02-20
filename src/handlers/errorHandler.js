const config = require("../config.js");
const { EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
/**
 * @param {Discord.Client} client
 */

module.exports = async (client) => {
    process.on("beforeExit", (code) => {
        // If You Want You Can Use
        console.log(code);
    });
    process.on("exit", (error) => {
        // If You Want You Can Use
        console.log(error);
    });
    process.on("unhandledRejection", async (reason, promise) => {
        // Needed
        console.log(reason);

        let errorLogsChannel = client.channels.cache.get(config.errorLogsChannel);
        if (!errorLogsChannel) errorLogsChannel = await client.channels.fetch(config.errorLogsChannel);
        const errEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle(`Error \`❗\``)
            .setDescription(`${reason}`)

        if (errorLogsChannel) {
            await errorLogsChannel.send({
                embeds: [errEmbed],
            });
        }
    });
    process.on("rejectionHandled", (promise) => {
        // If You Want You Can Use
        console.log(promise);
    });
    process.on("uncaughtException", (err, origin) => {
        // Needed
        console.log(err);
    });
    process.on("uncaughtExceptionMonitor", (err, origin) => {
        // Needed
        console.log(err);
    });
    process.on("warning", (warning) => {
        // If You Want You Can Use
        console.log(warning);
    });

    client.logger.log(chalk.blue(`Loaded ErrorHandler (AntiCrash)`));
};
