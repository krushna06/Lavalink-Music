const { EmbedBuilder, version, Message, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const Presto = require("../../structures/Client");
module.exports = {
  name: "status",
  description: "Displays bot status.",
  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const duration1 = moment
      .duration(interaction.client.uptime)
      .format(" d [days], h [hrs], m [mins], s [secs]");
    const about = interaction.client.emoji.about;
    let guildsCounts = await client.guilds.fetch();
    let channelsCounts = await client.channels.cache;
    let userCounts = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );

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
      { name: '```Users```', value: '```' + userCounts + '```', inline: true },
      { name: '```Discord.js```', value: '```v' + version + '```', inline: true },
      { name: '```Commands```', value: '```Updating```', inline: true },
      { name: '```Uptime```', value: '```' + duration1 + '```', inline: true },
      { name: '```Ping```', value: '```' + client.ws.ping + 'ms```', inline: true },
      { name: '```Node```', value: '```' + process.version + '```', inline: true },
    ]);
    let keplermusic = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`keplermusic`).setLabel(`${guildsCounts.size} Servers`).setDisabled(true),
            new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`keplermusic2`).setLabel(`${userCounts} Users`).setDisabled(true),
            new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`keplermusic3`).setLabel(`${client.ws.ping}ms`).setDisabled(true)
        );
    interaction.followUp({ embeds: [embed], components: [keplermusic] });
  },
};
