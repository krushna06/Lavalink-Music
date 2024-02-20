const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "invite",
  category: "Information",
  aliases: ["addme"],
  description: "Get the bot's invite link.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var support = client.config.links.support;
    var invite = client.config.links.invite;


    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite")
          .setEmoji("<:invitelrmn:1175006182834970655>")
          .setStyle(ButtonStyle.Link)
          .setURL(invite),
          new ButtonBuilder()
          .setLabel("Support")
          .setEmoji("<:supportlrmn:1175006362862882826>")
          .setStyle(ButtonStyle.Link)
          .setURL(support)
      );

    const keplermusic = new EmbedBuilder()
    .setAuthor({
      name: `${client.user.username} Invite`,
      url: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`,
      iconURL: client.user.displayAvatarURL({ dynamic: true })
    })
      .setColor(client.embedColor)
      .setDescription(`**Hey <@${message.author.id}>!\nYou can invite me by clicking the button below. Any bugs or outages? Join the support server!**`);

    message.reply({ embeds: [keplermusic], components: [row] })
  }
}
