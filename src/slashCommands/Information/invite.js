const { EmbedBuilder, CommandInteraction, ButtonStyle, Client, ButtonBuilder, ActionRowBuilder } = require("discord.js")

module.exports = {
    name: "invite",
    description: "Get the bot's invite link.",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });

           
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

          const mainPage = new EmbedBuilder()
          .setAuthor({
            name: `${client.user.username} Invite`,
            url: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`,
            iconURL: client.user.displayAvatarURL({ dynamic: true })
          })
            .setColor(client.embedColor)
            .setDescription(`**Hey ${interaction.user.username}!\nYou can invite me by clicking the button below. Any bugs or outages? Join the support server!**`);
             await interaction.followUp({embeds: [mainPage], components: [row]})
    }
}
