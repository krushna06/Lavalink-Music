const { EmbedBuilder, CommandInteraction, Client } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "ping",
    description: "Displays the bot's ping.",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
      
            const api_ping = client.ws.ping;

            let user = interaction.author;

          const PingEmbed = new EmbedBuilder()
          .setAuthor({ name: `| Pong ${api_ping}ms`, iconURL: interaction.member.displayAvatarURL({dynamic: true })})
        .setColor(client.embedColor)

      await interaction.followUp({
        embeds: [PingEmbed]
      })
        
    }
}