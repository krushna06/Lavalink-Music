const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "clearqueue",
    aliases: ["cq"],
    category: "Music",
    description: "Removes all tracks from the queue and stop the player.",
    args: false,
    usage: "<Number of song in queue>",
    userPerms: [],
    owner: false,
    dj: true,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
       
        const player = message.client.manager.get(message.guild.id);
   if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription('**<:infolrmn:1174990719396610090> There Is No Music Playing**');
            return message.channel.send({embeds: [thing]});
        }

		player.queue.clear();
    let notherposeidon2 = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTimestamp()
        .setAuthor({name:`Successfully Removed All Songs From Queue`})

      return message.channel.send({ embeds: [notherposeidon2] });
	
    }
};