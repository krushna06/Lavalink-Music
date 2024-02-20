const { EmbedBuilder, version, Message, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const Presto = require("../../structures/Client");

module.exports = {
  name: "stats",
  category: "Information",
  aliases: ['status'],
  description: "Displays bot stats.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  /**
   *
   * @param {Message} message
   * @param {string[]} args
   * @param {Presto} client
   * @param {string} prefix
   */
  execute: async (message, args, client, prefix) => {
    const duration1 = moment
      .duration(message.client.uptime)
      .format(" d [days], h [hrs], m [mins], s [secs]");
    let guildsCounts = await client.guilds.cache;
    let channelsCounts = await client.channels.cache;
    let usercount = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );
    let userCounts2 = usercount + usercount + usercount;
    const ping = client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({
        name: `${client.user.username} Stats`,
        url: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`,
        iconURL: client.user.displayAvatarURL({ dynamic: true })
      })
      .addFields([
        { name: '```Name```', value: '```' + client.user.username + '```', inline: true },
        { name: '```Servers```', value: '```' + guildsCounts.size + '```', inline: true },
        { name: '```Channels```', value: '```' + channelsCounts.size + '```', inline: true },
        { name: '```Users```', value: '```' + userCounts2 + '```', inline: true },
        { name: '```Discord.js```', value: '```v' + version + '```', inline: true },
        { name: '```Commands```', value: '```Updating```', inline: true },
        { name: '```Uptime```', value: '```' + duration1 + '```', inline: true },
        { name: '```Ping```', value: '```' + ping + 'ms```', inline: true },
        { name: '```Node```', value: '```' + process.version + '```', inline: true },
      ]);
      

    let keplermusic = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`keplermusic`).setLabel(`${guildsCounts.size} Servers`).setDisabled(true),
      new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`keplermusic2`).setLabel(`${userCounts2} Users`).setDisabled(true),
      new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`keplermusic3`).setLabel(`${client.ws.ping}ms`).setDisabled(true)
    );

    message.reply({ embeds: [embed], components: [keplermusic] });
  },
};
