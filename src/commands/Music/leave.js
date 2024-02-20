const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "leave",
    aliases: ["dc"],
    category: "Music",
    description: "Disconnects the bot from your voice channel.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    dj: true,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
       
        const player = message.client.manager.get(message.guild.id);

        player.destroy();

          return message.react(`<a:moodiscord:1171191481793515581>`)
	
    }
};