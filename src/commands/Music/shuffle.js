const { EmbedBuilder } = require("discord.js");

module.exports = {
  	name: "shuffle",
    category: "Music",
    description: "Shuffle the queue.",
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

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription('**<:infolrmn:1174990719396610090> There Is No Music Playing**')
            return message.reply({embeds: [thing]});
        }
        player.queue.shuffle();
        
        return message.react(`<a:moodiscord:1171191481793515581>`)
	
    }
};
