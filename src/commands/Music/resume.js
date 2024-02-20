const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "resume",
    aliases: ["r"],
    category: "Music",
    description: "Resume playing music.",
    args: false,
    usage: "",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
  
		const player = client.manager.get(message.guild.id);
        const song = player.queue.current;

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription('**<:infolrmn:1174990719396610090> There Is No Music Playing**')
            return message.reply({embeds: [thing]});
        }

        if (!player.paused) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name: `The Player Is Already Resumed`})
                .setTimestamp()
          return message.reply({embeds: [thing]});
        }

        player.pause(false);

        return message.react(`<a:moodiscord:1171191481793515581>`);
	
    }
};
