const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pauses the music currently playing.",
    args: false,
    usage: "",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
    
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription('**<:infolrmn:1174990719396610090> There Is No Music Playing**');
            return message.reply({embeds: [thing]});
        }

        const emojipause = client.emoji.pause;

        if (player.paused) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name: `The Player Is Already Paused`})
                .setTimestamp()
                return message.reply({embeds: [thing]});
        }

        player.pause(true);

        const song = player.queue.current;

        return message.react(`<a:moodiscord:1171191481793515581>`);
	
    }
};
