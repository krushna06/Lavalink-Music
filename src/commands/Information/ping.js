const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "ping",
  category: "Information",
  description: "Displays the bot's ping.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
      const ping = client.ws.ping;

      let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

      const PingEmbed = new EmbedBuilder()
        .setAuthor({ name: `Pong ${ping}ms`, iconURL: user.displayAvatarURL({dynamic: true })})
        .setColor(client.embedColor)


      message.reply({
        embeds: [PingEmbed]
      })
   }
}
